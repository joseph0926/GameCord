import { AppError } from "@/lib/errors";
import { ApiResponse } from "@/types/common.type";

export function createApiResponse<T>(
  data: T | null = null,
  error: AppError | null = null
): ApiResponse<T> {
  return {
    success: !error,
    data,
    error: error
      ? {
          code: error.code,
          message: error.message,
        }
      : null,
  };
}
