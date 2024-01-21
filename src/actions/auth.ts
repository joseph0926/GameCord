'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { LoginSchema, SignupSchema } from '@/lib/schemas';
import { db } from '@/lib/db';
import { signIn, signOut } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/query/get-user';
import {
  generateVerificationToken,
  getVerificationTokenByToken,
} from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

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
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: '인증 이메일을 발송하였습니다.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: '유효하지 않은 자격증명입니다.' };
        default:
          return { error: '알수없는 에러가 발생하였습니다.' };
      }
    }

    throw error;
  }
};

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFileds = SignupSchema.safeParse(values);
  if (!validatedFileds.success) {
    return { error: '이름 또는 이메일 또는 비밀번호가 유효하지 않습니다.' };
  }

  const { email, password, name } = validatedFileds.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: '이미 해당 이메일로 가입된 정보가 존재합니다.' };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: '인증 이메일을 발송하였습니다.' };
};

export const logout = async () => {
  await signOut();
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: '유효하지 않은 토큰입니다.' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: '토큰이 만료되었습니다.' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: '해당 이메일로 가입된 정보를 찾을 수 없습니다.' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: '이메일 인증에 성공하였습니다.' };
};
