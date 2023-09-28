import bcrypt from 'bcrypt';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return new NextResponse('필수값을 입력하지 않았습니다.', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[SIGNUP]: ', error);
    return new NextResponse('Server error', { status: 500 });
  }
};
