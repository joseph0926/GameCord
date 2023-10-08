'use server';

import { db } from '@/lib/db';
import { redis, fetchRedis } from '@/lib/redis';
import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

type UpdateUserProps = {
  updateData: {
    name: string;
    imageUrl: string;
  };
  // path: string;
};

export const createUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw null;
    }

    const profile = await db.profile.findUnique({
      where: {
        profileId: user.id
      }
    });

    if (profile) {
      return profile;
    }

    const email = user.emailAddresses[0].emailAddress;

    const newProfile = await db.profile.create({
      data: {
        profileId: user.id,
        name: user.username!,
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
    where: { profileId: userId }
  });

  const cachedUser = await fetchRedis('get', `user:${userId}`);
  if (JSON.parse(cachedUser)?.id !== profile?.id) {
    await redis.set(`user:${userId}`, profile, { ex: 86400 });
    return profile;
  }
  if (cachedUser && cachedUser !== 'null') {
    return JSON.parse(cachedUser);
  }

  if (!cachedUser || cachedUser === 'null' || cachedUser === '') {
    await redis.set(`user:${userId}`, profile, { ex: 86400 });
  }

  return profile;
};

export const updateUser = async (data: UpdateUserProps) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw null;
    }

    const { updateData } = data;

    const profile = await db.profile.update({
      where: {
        profileId: user.id
      },
      data: updateData
    });

    await redis.set(`user:${user.id}`, profile, { ex: 86400 });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw null;
    }

    await db.profile.delete({
      where: {
        profileId: user.id
      }
    });

    await redis.set(`user:${user.id}`, null, { ex: 86400 });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
