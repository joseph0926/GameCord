import { UserRole } from '@prisma/client';
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

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: '새로운 비밀번호를 입력해주세요.',
      path: ['newPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: '비밀번호를 입력해주세요.',
      path: ['password'],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum of 6 characters required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});
