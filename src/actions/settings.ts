'use server';

import { db } from '@/lib/db';
import { SettingsSchema } from '@/lib/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '@/lib/token';
import { unstable_update } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/mail';
import { currentUser } from '@/query/current-user';
import { getUserByEmail, getUserById } from '@/query/get-user';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: '인증오류,,,' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: '인증오류,,,' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: '이미 사용중인 이메일입니다.' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: '해당 이메일로 인증 이메일을 보냈습니다.' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: '비밀번호가 일치하지 않습니다.' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });

  return { success: '설정이 저장되었습니다.' };
};
