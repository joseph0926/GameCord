import * as z from 'zod';

export const authFormSchema = z.object({
  name: z.string(),
  email: z.string().nonempty().email().min(1),
  password: z.string().nonempty().min(6).max(10)
});
