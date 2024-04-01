'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

import { signIn } from '@/auth';
import { signinSchema, signupSchema } from '@/lib/validations/sign.schema';
import { getUserByEmail } from '@/service/query/auth.service';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {
  generateVerificationToken,
  sendVerificationEmail
} from '../query/user.service';
import { db } from '@/lib/db';

export const login = async (
  values: z.infer<typeof signinSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = signinSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};

export const register = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
