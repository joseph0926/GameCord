import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 주소를 입력해주세요." }),

  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .max(100, { message: "비밀번호는 100자를 초과할 수 없습니다." }),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "사용자 이름은 최소 3자 이상이어야 합니다." })
    .max(30, { message: "사용자 이름은 30자를 초과할 수 없습니다." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "사용자 이름은 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.",
    }),

  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .max(50, { message: "이름은 50자를 초과할 수 없습니다." })
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: "이름은 한글, 영문, 공백만 사용할 수 있습니다.",
    }),

  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 주소를 입력해주세요." }),

  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .max(100, { message: "비밀번호는 100자를 초과할 수 없습니다." })
    .regex(/[A-Z]/, {
      message: "비밀번호는 최소 1개의 대문자를 포함해야 합니다.",
    })
    .regex(/[a-z]/, {
      message: "비밀번호는 최소 1개의 소문자를 포함해야 합니다.",
    })
    .regex(/[0-9]/, {
      message: "비밀번호는 최소 1개의 숫자를 포함해야 합니다.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "비밀번호는 최소 1개의 특수문자를 포함해야 합니다.",
    }),
});
