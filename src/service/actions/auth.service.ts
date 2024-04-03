'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

import { signIn } from '@/auth';
import { signinSchema, signupSchema } from '@/lib/validations/sign.schema';
import {
  getUserByEmail,
  getVerificationTokenByToken
} from '@/service/query/auth.service';
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
    return { error: '해당 이메일로 가입된 정보가 존재하지 않습니다.' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: '이메일 인증을 완료해주세요.' };
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
          return { error: '알수없는 에러가 발생하였습니다.' };
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
    return { error: '해당 이메일로 가입된 정보가 이미 존재합니다.' };
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

  return { success: '이메일 인증 메일을 발송하였습니다.' };
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: '토큰이 존재하지 않습니다.' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: '토큰 유효기간이 만료되었습니다.' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: '해당 이메일로 가입된 정보가 존재하지 않습니다.' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: '이메일 인증 완료!' };
};
