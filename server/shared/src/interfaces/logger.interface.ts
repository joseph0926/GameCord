export interface ResponseData {
  statusCode?: number;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
}

export interface RpcData {
  pattern: string;
  data: unknown;
}

export interface HttpRequest {
  method: string;
  url: string;
  body: Record<string, unknown>;
  params: Record<string, string>;
  query: Record<string, string>;
}

/**
 * 로그 메타데이터의 기본 인터페이스
 */
export interface LogMetadata {
  context?: string;
  timestamp?: string;
  level?: string;
  message?: string;
  service?: string;
  trace?: string;
  [key: string]: unknown;
}
