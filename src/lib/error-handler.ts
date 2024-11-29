import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { RequestError, ValidationError } from '@/lib/http-errors';
import logger from '@/lib/logger';

export type ResponseType = 'api' | 'server';

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: Record<string, string[]>;
    code?: string;
  };
}

const getErrorCode = (status: number): string => {
  const errorCodes: Record<number, string> = {
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    422: 'VALIDATION_ERROR',
    429: 'TOO_MANY_REQUESTS',
    500: 'INTERNAL_SERVER_ERROR',
    502: 'BAD_GATEWAY',
    503: 'SERVICE_UNAVAILABLE',
    504: 'GATEWAY_TIMEOUT',
  };
  return errorCodes[status] || 'UNKNOWN_ERROR';
};

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
): ResponseType extends 'api' ? NextResponse : ErrorResponse => {
  const responseContent: ErrorResponse = {
    success: false,
    error: {
      message,
      code: getErrorCode(status),
      ...(errors && { details: errors }),
    },
  };

  return (responseType === 'api'
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent }) as unknown as ResponseType extends 'api'
    ? NextResponse
    : ErrorResponse;
};

const handleError = (error: unknown, responseType: ResponseType = 'server') => {
  const timestamp = new Date().toISOString();

  if (error instanceof RequestError) {
    logger.error(
      {
        timestamp,
        type: 'REQUEST_ERROR',
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
        stack: error.stack,
      },
      `[${responseType.toUpperCase()}] 요청 처리 중 오류가 발생했습니다`
    );

    return formatResponse(
      responseType,
      error.statusCode,
      error.message || '요청을 처리하는 중 오류가 발생했습니다',
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationErrors = error.flatten().fieldErrors;
    const errors: Record<string, string[]> = {};

    Object.entries(validationErrors).forEach(([field, messages]) => {
      errors[field] =
        messages?.map((msg) => {
          if (msg.includes('Required')) return '필수 입력 항목입니다';
          if (msg.includes('Invalid')) return '올바르지 않은 형식입니다';
          if (msg.includes('too short')) return '너무 짧습니다';
          if (msg.includes('too long')) return '너무 깁니다';
          return '유효하지 않은 값입니다';
        }) || [];
    });

    const validationError = new ValidationError(errors);

    logger.error(
      {
        timestamp,
        type: 'VALIDATION_ERROR',
        fields: errors,
        originalError: error.flatten(),
        stack: error.stack,
      },
      '[유효성 검사] 입력값 검증에 실패했습니다'
    );

    return formatResponse(
      responseType,
      validationError.statusCode,
      '입력값 검증에 실패했습니다',
      errors
    );
  }

  if (error instanceof Error) {
    logger.error(
      {
        timestamp,
        type: 'GENERAL_ERROR',
        message: error.message,
        stack: error.stack,
      },
      '[시스템 오류] 예상치 못한 오류가 발생했습니다'
    );

    return formatResponse(
      responseType,
      500,
      error.message || '서버에서 오류가 발생했습니다'
    );
  }

  logger.error(
    {
      timestamp,
      type: 'UNKNOWN_ERROR',
      error,
    },
    '[알 수 없는 오류] 처리되지 않은 오류가 발생했습니다'
  );

  return formatResponse(responseType, 500, '알 수 없는 오류가 발생했습니다');
};

export default handleError;
