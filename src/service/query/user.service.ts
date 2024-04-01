import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/db';

import { Resend } from 'resend';
import {
  getPasswordResetTokenByEmail,
  getVerificationTokenByEmail
} from './auth.service';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/sign/new-password?token=${token}`;

  await resend.emails.send({
    from: 'gamecord@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/sign/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'gamecord@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return verficationToken;
};
