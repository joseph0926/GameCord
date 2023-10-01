'use server';

import * as z from 'zod';
import { authFormSchema } from '@/lib/validations/auth';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const signupAction = async (values: z.infer<typeof authFormSchema>) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: values.email
      }
    });
    if (user) {
      throw new Error('이미 존재하는 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(values.password, 12);

    await db.user.create({
      data: { email: values.email, name: values.email.substring(0, values.email.indexOf('@')), password: hashedPassword, imageUrl: '' }
    });

    redirect('/');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  return session;
};
