import * as z from 'zod';

export const gameSchema = z.object({
  title: z.string().min(1).max(130),
  description: z.string().min(30),
  category: z.string().min(1),
  link: z.string().min(1),
  publisher: z.string().min(1),
  imageUrl: z.string().min(1),
  jjal: z.string(),
  releaseDate: z.date(),
  path: z.string()
});
