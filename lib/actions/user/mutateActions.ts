'use server';

import db from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export const createUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: {
      userId: clerkUser.id
    }
  });
  if (user) {
    return user;
  }

  const email = clerkUser.emailAddresses[0].emailAddress;

  const newuser = await db.user.create({
    data: {
      userId: clerkUser.id,
      name: email.substring(0, email.indexOf('@')),
      imageUrl: clerkUser.imageUrl,
      email
    }
  });

  return newuser;
};
