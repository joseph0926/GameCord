import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .min(1, "이메일은 필수 입력 항목입니다."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(100, "비밀번호가 너무 깁니다.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다."
    ),
  name: z
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .max(100, "이름이 너무 깁니다."),
});

export const emailVerificationSchema = z.object({
  token: z.string().min(1, "토큰은 필수 입력 항목입니다."),
});
