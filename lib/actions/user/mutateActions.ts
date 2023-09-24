'use server';

import db from '@/lib/db';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';

export const createUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return redirectToSignIn();
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
