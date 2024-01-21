import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { NewPasswordSchema } from '@/lib/schemas';
import { getPasswordResetTokenByToken } from '@/lib/token';
import { getUserByEmail } from './get-user';

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
