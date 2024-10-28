import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpRequest, ResponseData, RpcData } from '../interfaces';

import { CustomLoggerService } from '../logger/logger.service';

/**
 * 전역 로깅 인터셉터
 * 모든 요청과 응답을 자동으로 로깅합니다.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor<unknown, unknown> {
  private readonly logger: CustomLoggerService;

  constructor(logger: CustomLoggerService) {
    this.logger = logger;
    this.logger.setContext('LoggingInterceptor');
  }

  /**
   * 요청/응답 인터셉트 메서드
   * @param context - 실행 컨텍스트
   * @param next - 다음 핸들러
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    const requestId = Math.random().toString(36).substring(7);
    const contextType = context.getType();

    if (contextType === 'http') {
      const request = context.switchToHttp().getRequest<HttpRequest>();
      this.logHttpRequest(request, requestId);
    } else if (contextType === 'rpc') {
      this.logRpcRequest(context, requestId);
    }

    return next.handle().pipe(
      tap({
        next: (data: ResponseData) => this.logSuccess(data, now, requestId),
        error: (error: Error) => this.logError(error, now, requestId),
      }),
    );
  }

  /**
   * HTTP 요청 로깅
   * @param request - HTTP 요청 객체
   * @param requestId - 요청 식별자
   */
  private logHttpRequest(request: HttpRequest, requestId: string): void {
    const { method, url, body, params, query } = request;
    this.logger.log(`수신된 HTTP 요청: ${method} ${url}`, undefined, {
      requestId,
      body,
      params,
      query,
    });
  }

  /**
   * RPC 요청 로깅
   * @param context - 실행 컨텍스트
   * @param requestId - 요청 식별자
   */
  private logRpcRequest(context: ExecutionContext, requestId: string): void {
    const rpcContext = context.switchToRpc();
    const rpcData: RpcData = {
      pattern: String(rpcContext.getContext()),
      data: rpcContext.getData(),
    };

    this.logger.log('수신된 RPC 호출', undefined, {
      requestId,
      ...rpcData,
    });
  }

  /**
   * 성공적인 응답 로깅
   * @param data - 응답 데이터
   * @param startTime - 요청 시작 시간
   * @param requestId - 요청 식별자
   */
  private logSuccess(data: ResponseData, startTime: number, requestId: string): void {
    const duration = Date.now() - startTime;
    this.logger.log('요청 처리 완료', undefined, {
      requestId,
      duration: `${duration}ms`,
      response: data,
    });
  }

  /**
   * 에러 응답 로깅
   * @param error - 발생한 에러
   * @param startTime - 요청 시작 시간
   * @param requestId - 요청 식별자
   */
  private logError(error: Error, startTime: number, requestId: string): void {
    const duration = Date.now() - startTime;
    this.logger.error('요청 처리 실패', error.stack, undefined, {
      requestId,
      duration: `${duration}ms`,
      error: {
        message: error.message,
        name: error.name,
      },
    });
  }
}
