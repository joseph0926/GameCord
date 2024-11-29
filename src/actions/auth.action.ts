'use server';

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { signIn } from '@/auth';
import Account from '@/database/account.model';
import User from '@/database/user.model';
import handleError from '@/lib/error-handler';
import { NotFoundError } from '@/lib/http-errors';
import { SignInSchema, SignUpSchema } from '@/schemas/auth.schema';
import { ActionResponse } from '@/types/api.type';
import { AuthCredentials } from '@/types/auth.type';
import action from './action.handler';

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult);
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new Error('이미 가입된 이메일입니다');
    }

    const existingUsername = await User.findOne({ username }).session(session);

    if (existingUsername) {
      throw new Error('이미 사용 중인 사용자명입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: 'credentials',
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    await signIn('credentials', { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    await session.abortTransaction();

    return handleError(error);
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, 'email' | 'password'>
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignInSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult);
  }

  const { email, password } = validationResult.params!;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new NotFoundError('가입되지 않은 이메일입니다');

    const existingAccount = await Account.findOne({
      provider: 'credentials',
      providerAccountId: email,
    });

    if (!existingAccount) throw new NotFoundError('계정을 찾을 수 없습니다');

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password
    );

    if (!passwordMatch) throw new Error('비밀번호가 일치하지 않습니다');

    await signIn('credentials', { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}
