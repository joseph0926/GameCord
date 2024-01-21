'use server';

import * as z from 'zod';
import bcrypt from 'bcrypt';
import { LoginSchema, NewPasswordSchema, SignupSchema } from '@/lib/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/actions/user';
import { signIn, signOut } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { auth } from '@/lib/auth';
import { getPasswordResetTokenByToken } from '@/lib/token';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFileds = LoginSchema.safeParse(values);
  if (!validatedFileds.success) {
    return { error: '이메일 또는 비밀번호가 유효하지 않습니다.' };
  }

  const { email, password } = validatedFileds.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: '유효하지 않은 자격 증명입니다.' };
        default:
          return { error: '잘못된 인증입니다.' };
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

  return { success: '인증 이메일을 발송하였습니다.' };
};

export const logout = async () => {
  await signOut();
};

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: '토큰이 유효하지 않습니다.' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: '비밀번호가 유효하지 않습니다.' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: '토큰이 유효하지 않습니다.' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: '만료된 토큰입니다.' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: '해당 이메일로 가입된 정보를 찾을 수 없습니다.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: '비밀번호가 성공적으로 변경되었습니다.' };
};
