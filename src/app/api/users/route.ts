import { NextResponse } from 'next/server';
import User from '@/database/user.model';
import dbConnect from '@/lib/db';
import handleError from '@/lib/error-handler';
import { ValidationError } from '@/lib/http-errors';
import { UserSchema } from '@/schemas/auth.schema';

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, 'api');
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = UserSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, username } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('이미 존재하는 User입니다.');

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error('이미 존재하는 Username입니다.');

    const newUser = await User.create(validatedData.data);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, 'api');
  }
}
