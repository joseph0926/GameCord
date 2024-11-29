import handleError from '@/lib/error-handler';
import { RequestError } from '@/lib/http-errors';
import logger from '@/lib/logger';
import { ActionResponse } from '@/types/api.type';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP 요청 실패: ${response.status} - ${getStatusMessage(response.status)}`
      );
    }

    return await response.json();
  } catch (err) {
    const error = isError(err)
      ? err
      : new Error('알 수 없는 오류가 발생했습니다');

    if (error.name === 'AbortError') {
      logger.warn(
        `[요청 시간 초과] URL: ${url}, 제한 시간: ${timeout}ms를 초과하였습니다`
      );
    } else {
      logger.error(
        `[API 요청 실패] URL: ${url}, 오류 내용: ${error.message}, 요청 방식: ${
          config.method || 'GET'
        }`
      );
    }

    return handleError(error) as ActionResponse<T>;
  }
}

function getStatusMessage(status: number): string {
  const statusMessages: Record<number, string> = {
    400: '잘못된 요청입니다',
    401: '인증이 필요합니다',
    403: '접근이 거부되었습니다',
    404: '요청한 리소스를 찾을 수 없습니다',
    408: '요청 시간이 초과되었습니다',
    429: '너무 많은 요청이 발생했습니다',
    500: '서버 내부 오류가 발생했습니다',
    502: '게이트웨이 오류가 발생했습니다',
    503: '서비스를 사용할 수 없습니다',
    504: '게이트웨이 시간 초과가 발생했습니다',
  };

  return statusMessages[status] || '알 수 없는 오류가 발생했습니다';
}
