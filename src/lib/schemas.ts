import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: '유효하지 않은 이메일 형식입니다.',
  }),
  password: z.string().min(6, {
    message: '비밀번호는 최소 6자리 이상이어야합니다.',
  }),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: '유효하지 않은 이메일 형식입니다.',
  }),
  password: z.string().min(6, {
    message: '비밀번호는 최소 6자리 이상이어야합니다.',
  }),
  name: z.string().min(1, {
    message: 'Name은 필수 입력 항목입니다.',
  }),
});
