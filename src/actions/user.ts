'use server';

import { db } from '@/lib/db';
import { redis, fetchRedis } from '@/lib/redis';
import { currentUser } from '@clerk/nextjs';
import { UserRole, Profile } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type CreateUserProps = {
  clerkId: string;
  email: string;
  imageUrl: string;
  name: string;
};

type UpdateUserProps = {
  clerkId: string;
  updateData: {
    name: string;
    imageUrl: string;
  };
};

export const createUser = async (data: CreateUserProps) => {
  try {
    const { clerkId, email, name, imageUrl } = data;

    const profile = await db.profile.findUnique({
      where: {
        profileId: clerkId
      }
    });
    if (profile?.email === 'rkekqmf0926@gmail.com' || profile?.email === 'santiago.stokes@ethereal.email') {
      await db.profile.update({
        where: {
          id: profile.id
        },
        data: {
          role: UserRole.TOP
        }
      });
    }

    if (profile) {
      return profile;
    }

    const newProfile = await db.profile.create({
      data: {
        profileId: clerkId,
        name,
        imageUrl,
        email,
        role: email === 'rkekqmf0926@gmail.com' || email === 'santiago.stokes@ethereal.email' ? UserRole.TOP : UserRole.BOT
      }
    });

    await redis.set(`user:${clerkId}`, newProfile, { ex: 86400 });

    revalidatePath('/');

    return newProfile;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCurrentUser = async (): Promise<Profile | null> => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: { profileId: user.id }
  });

  const cachedUser = await fetchRedis('get', `user:${user.id}`);
  if (JSON.parse(cachedUser)?.id !== profile?.id) {
    await redis.set(`user:${user.id}`, profile, { ex: 86400 });
    return profile;
  }
  if (cachedUser && cachedUser !== 'null') {
    return JSON.parse(cachedUser);
  }

  if (!cachedUser || cachedUser === 'null' || cachedUser === '') {
    await redis.set(`user:${user.id}`, profile, { ex: 86400 });
  }

  return profile;
};

export const updateUser = async (data: UpdateUserProps) => {
  try {
    const { clerkId, updateData } = data;

    const profile = await db.profile.update({
      where: {
        profileId: clerkId
      },
      data: updateData
    });

    await redis.set(`user:${clerkId}`, profile, { ex: 86400 });
  } catch (error) {
    console.log(error);
    return error;
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
    return error;
  }
};
