import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

/**
 * 마이크로서비스 전반에 걸쳐 사용되는 커스텀 로거 서비스
 * Winston을 기반으로 확장된 로깅 기능을 제공합니다.
 */
@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: Logger;
  private context?: string;

  /**
   * 로거 서비스 생성자
   * @param context - 로그를 생성하는 서비스/모듈의 컨텍스트 이름
   */
  constructor(context?: string) {
    this.context = context;
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.metadata({
          fillExcept: ['timestamp', 'level', 'message', 'service', 'context'],
        }),
        format.json(),
      ),
      defaultMeta: {
        service: context || 'unknown-service',
      },
      transports: [
        // 개발 환경을 위한 콘솔 로그 설정
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ timestamp, level, message, context, ...meta }) => {
              return `${timestamp} ${level}: [${context}] ${message} ${
                Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
              }`;
            }),
          ),
        }),
        // 에러 로그를 위한 파일 설정
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
        }),
        // 전체 로그를 위한 파일 설정
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  /**
   * 로거의 컨텍스트를 설정합니다.
   * @param context - 설정할 컨텍스트 이름
   */
  setContext(context: string) {
    this.context = context;
  }

  /**
   * 정보 레벨 로그를 기록합니다.
   * @param message - 로그 메시지
   * @param context - 선택적 컨텍스트 (기본값: 생성자에서 설정된 컨텍스트)
   * @param meta - 추가 메타데이터
   */
  log(message: string, context?: string, ...meta: any[]) {
    this.logger.info(message, {
      context: context || this.context,
      ...meta,
    });
  }

  /**
   * 에러 레벨 로그를 기록합니다.
   * @param message - 에러 메시지
   * @param trace - 에러 스택 트레이스
   * @param context - 선택적 컨텍스트
   * @param meta - 추가 메타데이터
   */
  error(message: string, trace?: string, context?: string, ...meta: any[]) {
    this.logger.error(message, {
      context: context || this.context,
      trace,
      ...meta,
    });
  }

  /**
   * 경고 레벨 로그를 기록합니다.
   * @param message - 경고 메시지
   * @param context - 선택적 컨텍스트
   * @param meta - 추가 메타데이터
   */
  warn(message: string, context?: string, ...meta: any[]) {
    this.logger.warn(message, {
      context: context || this.context,
      ...meta,
    });
  }

  /**
   * 디버그 레벨 로그를 기록합니다.
   * @param message - 디버그 메시지
   * @param context - 선택적 컨텍스트
   * @param meta - 추가 메타데이터
   */
  debug(message: string, context?: string, ...meta: any[]) {
    this.logger.debug(message, {
      context: context || this.context,
      ...meta,
    });
  }

  /**
   * 상세 레벨 로그를 기록합니다.
   * @param message - 상세 로그 메시지
   * @param context - 선택적 컨텍스트
   * @param meta - 추가 메타데이터
   */
  verbose(message: string, context?: string, ...meta: any[]) {
    this.logger.verbose(message, {
      context: context || this.context,
      ...meta,
    });
  }
}
