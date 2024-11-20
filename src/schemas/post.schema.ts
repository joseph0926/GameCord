import { z } from 'zod';

export const CreatePostSchema = z.object({
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
