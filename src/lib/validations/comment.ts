import * as z from 'zod';

export const commentSchema = z.object({
  comment: z.string().min(10)
});
