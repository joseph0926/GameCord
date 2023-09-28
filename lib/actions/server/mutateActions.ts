'use server';

import db from '@/lib/db';
import { getCurrentUser } from '../user/fetchActions';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type CreateServerProps = {
  name: string;
  imageUrl: string;
  path: string;
};

export const createServer = async ({ data }: { data: CreateServerProps }) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const { name, imageUrl, path } = data;

  const server = await db.server.create({
    data: {
      userId: user,
      name,
      imageUrl,
      inviteCode: uuidv4(),
      channels: {
        create: [{ name: 'general', userId: user }]
      },
      members: {
        create: [{ userId: user, role: MemberRole.ADMIN }]
      }
    }
  });

  revalidatePath(path);

  return server;
};
