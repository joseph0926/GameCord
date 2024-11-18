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
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: '아이디는 영문자, 숫자, 밑줄(_)만 사용할 수 있습니다.',
    }),

  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(50, { message: '이름은 50자를 초과할 수 없습니다.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: '이름은 영문자와 공백만 사용할 수 있습니다.',
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

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: '제목을 입력해주세요.' })
    .max(100, { message: '제목은 100자를 초과할 수 없습니다.' }),

  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: '태그를 입력해주세요.' })
        .max(30, { message: '태그는 30자를 초과할 수 없습니다.' })
    )
    .min(1, { message: '최소 1개의 태그가 필요합니다.' })
    .max(3, { message: '태그는 최대 3개까지만 추가할 수 있습니다.' }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  username: z
    .string()
    .min(3, { message: '아이디는 최소 3자 이상이어야 합니다.' }),
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
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
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
