'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest } from 'next';

export const getCurrentUser = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { userId }
  });

  return user;
};

export const getCurrentUserAsPage = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { userId }
  });

  return user;
};
