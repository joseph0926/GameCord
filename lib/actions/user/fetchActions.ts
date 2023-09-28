'use server';

import db from '@/lib/db';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email
    }
  });
  if (!user) {
    return null;
  }

  return user;
};

export const getCurrentUserAsPage = async (req: NextApiRequest) => {
  return null;
};
