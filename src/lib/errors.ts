export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: new AppError(
    "INVALID_CREDENTIALS",
    "이메일 또는 비밀번호가 올바르지 않습니다.",
    401
  ),
  EMAIL_EXISTS: new AppError(
    "EMAIL_EXISTS",
    "이미 사용 중인 이메일입니다.",
    409
  ),
  INVALID_TOKEN: new AppError(
    "INVALID_TOKEN",
    "유효하지 않거나 만료된 토큰입니다.",
    400
  ),
  EMAIL_NOT_VERIFIED: new AppError(
    "EMAIL_NOT_VERIFIED",
    "이메일 인증이 필요합니다.",
    403
  ),
  USER_NOT_FOUND: new AppError(
    "USER_NOT_FOUND",
    "사용자를 찾을 수 없습니다.",
    404
  ),
} as const;
