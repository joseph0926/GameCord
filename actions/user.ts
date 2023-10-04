'use server';

import { db } from '@/lib/db';
import { redis, fetchRedis } from '@/lib/redis';
import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export const createUser = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.id || user.id === '') {
      return redirect('/sign-in');
    }

    const cachedUser = (await fetchRedis('get', `user:${user.id}`)) as string;
    if (cachedUser && cachedUser !== 'null' && cachedUser !== '') {
      return cachedUser;
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id
      }
    });
    if (profile) {
      return profile;
    }

    const email = user.emailAddresses[0].emailAddress;

    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: email.slice(0, email.indexOf('@')),
        imageUrl: user.imageUrl,
        email
      }
    });

    await redis.set(`user:${user.id}`, newProfile, { ex: 86400 });

    return newProfile;
  } catch (error) {
    console.log(error);
    redirect('/sign-in');
  }
};

export const getCurrentUser = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: { userId }
  });

  const cachedUser = await fetchRedis('get', `user:${userId}`);
  if (JSON.parse(cachedUser)?.id !== profile?.id) {
    await redis.set(`user:${userId}`, profile, { ex: 86400 });
    return profile;
  }
  if (cachedUser && cachedUser !== 'null') {
    console.log('cachedUser');
    return JSON.parse(cachedUser);
  }

  if (!cachedUser || cachedUser === 'null' || cachedUser === '') {
    console.log('dbUser');
    await redis.set(`user:${userId}`, profile, { ex: 86400 });
  }

  return profile;
};
