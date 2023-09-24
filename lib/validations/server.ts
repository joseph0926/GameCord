import * as z from 'zod';

export const serverFormSchema = z.object({
  name: z.string().nonempty().min(1, {
    message: 'Server name is required'
  }),
  imageUrl: z.string().nonempty().min(1)
});
