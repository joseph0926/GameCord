import * as z from 'zod';

export const signinSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 4자리 이상이어야합니다.' })
    .max(12, { message: '비밀번호는 12자리 이하여야합니다.' })
});

export const signupSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 4자리 이상이어야합니다.' })
    .max(12, { message: '비밀번호는 12자리 이하여야합니다.' })
});
