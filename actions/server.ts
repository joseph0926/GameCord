'use server';

import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { ChannelType, MemberRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/actions/user';

type CreateServerProps = {
  name: string;
  imageUrl: string;
  path: string;
};

export const createServer = async ({ data }: { data: CreateServerProps }) => {
  const profile = await getCurrentUser();
  if (!profile) {
    return null;
  }

  const { name, imageUrl, path } = data;

  const server = await db.server.create({
    data: {
      profileId: profile.id,
      name,
      imageUrl,
      inviteCode: uuidv4(),
      channels: {
        create: [{ name: 'general', profileId: profile.id, type: ChannelType.TEXT }]
      },
      members: {
        create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
      }
    }
  });

  revalidatePath(path);

  return server;
};
