import * as z from 'zod';

export const chatFormSchema = z.object({
  content: z.string().nonempty().min(1)
});
