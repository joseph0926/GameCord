import { ChannelType } from '@prisma/client';
import * as z from 'zod';

export const serverFormSchema = z.object({
  name: z.string().nonempty().min(1, {
    message: 'Server name is required'
  }),
  imageUrl: z.string().nonempty().min(1),
  gameId: z.string().min(1)
});

export const channelFormSchema = z.object({
  name: z
    .string()
    .nonempty()
    .min(1)
    .refine((name) => name !== 'general'),
  type: z.nativeEnum(ChannelType)
});
