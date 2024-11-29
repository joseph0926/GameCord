import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 주소를 입력해주세요.' }),

  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
    .max(100, { message: '비밀번호는 100자를 초과할 수 없습니다.' }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: '아이디는 최소 3자 이상이어야 합니다.' })
    .max(30, { message: '아이디는 30자를 초과할 수 없습니다.' })
    .regex(/^[가-힣a-zA-Z0-9_]+$/, {
      message: '아이디는 한글, 영문자, 숫자, 밑줄(_)만 사용할 수 있습니다.',
    }),

  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(50, { message: '이름은 50자를 초과할 수 없습니다.' })
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: '이름은 한글, 영문자와 공백만 사용할 수 있습니다.',
    }),

  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 주소를 입력해주세요.' }),

  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
    .max(100, { message: '비밀번호는 100자를 초과할 수 없습니다.' })
    .regex(/[A-Z]/, {
      message: '비밀번호는 최소 1개의 대문자를 포함해야 합니다.',
    })
    .regex(/[a-z]/, {
      message: '비밀번호는 최소 1개의 소문자를 포함해야 합니다.',
    })
    .regex(/[0-9]/, {
      message: '비밀번호는 최소 1개의 숫자를 포함해야 합니다.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: '비밀번호는 최소 1개의 특수문자를 포함해야 합니다.',
    }),
});

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: '이름은 한글, 영문자와 공백만 사용할 수 있습니다.',
    }),
  username: z
    .string()
    .min(3, { message: '아이디는 최소 3자 이상이어야 합니다.' })
    .regex(/^[가-힣a-zA-Z0-9_]+$/, {
      message: '아이디는 한글, 영문자, 숫자, 밑줄(_)만 사용할 수 있습니다.',
    }),
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
  bio: z.string().optional(),
  image: z.string().url({ message: '올바른 URL을 입력해주세요.' }).optional(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: '올바른 URL을 입력해주세요.' })
    .optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: '사용자 ID를 입력해주세요.' }),
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: '이름은 한글, 영문자와 공백만 사용할 수 있습니다.',
    }),
  image: z.string().url({ message: '올바른 URL을 입력해주세요.' }).optional(),
  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
    .max(100, { message: '비밀번호는 100자를 초과할 수 없습니다.' })
    .regex(/[A-Z]/, {
      message: '비밀번호는 최소 1개의 대문자를 포함해야 합니다.',
    })
    .regex(/[a-z]/, {
      message: '비밀번호는 최소 1개의 소문자를 포함해야 합니다.',
    })
    .regex(/[0-9]/, {
      message: '비밀번호는 최소 1개의 숫자를 포함해야 합니다.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: '비밀번호는 최소 1개의 특수문자를 포함해야 합니다.',
    })
    .optional(),
  provider: z.string().min(1, { message: '제공자를 입력해주세요.' }),
  providerAccountId: z
    .string()
    .min(1, { message: '제공자 계정 ID를 입력해주세요.' }),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(['google'], {
    required_error: '지원하지 않는 로그인 방식입니다.',
    invalid_type_error: '올바르지 않은 로그인 방식입니다.',
  }),

  providerAccountId: z
    .string({
      required_error: '계정 ID가 필요합니다.',
      invalid_type_error: '올바르지 않은 계정 ID 형식입니다.',
    })
    .min(1, { message: '계정 ID는 필수 항목입니다.' }),

  user: z.object(
    {
      name: z
        .string({
          required_error: '이름을 입력해주세요.',
          invalid_type_error: '올바르지 않은 이름 형식입니다.',
        })
        .min(1, { message: '이름은 필수 항목입니다.' })
        .regex(/^[가-힣a-zA-Z\s]+$/, {
          message: '이름은 한글, 영문자와 공백만 사용할 수 있습니다.',
        }),

      username: z
        .string({
          required_error: '사용자명을 입력해주세요.',
          invalid_type_error: '올바르지 않은 사용자명 형식입니다.',
        })
        .min(3, { message: '사용자명은 3자 이상이어야 합니다.' })
        .regex(/^[가-힣a-zA-Z0-9_-]+$/, {
          message:
            '사용자명은 한글, 영문자, 숫자, 밑줄(_), 하이픈(-)만 사용할 수 있습니다.',
        }),

      email: z
        .string({
          required_error: '이메일을 입력해주세요.',
          invalid_type_error: '올바르지 않은 이메일 형식입니다.',
        })
        .email({ message: '올바른 이메일 주소를 입력해주세요.' }),

      image: z
        .string({
          invalid_type_error: '올바르지 않은 이미지 URL 형식입니다.',
        })
        .url({ message: '올바른 이미지 URL을 입력해주세요.' })
        .optional()
        .describe('프로필 이미지 URL'),
    },
    {
      required_error: '사용자 정보가 필요합니다.',
      invalid_type_error: '올바르지 않은 사용자 정보 형식입니다.',
    }
  ),
});
