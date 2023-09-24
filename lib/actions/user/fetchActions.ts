'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs';

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
