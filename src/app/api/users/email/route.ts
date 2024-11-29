import { NextResponse } from 'next/server';
import User from '@/database/user.model';
import dbConnect from '@/lib/db';
import handleError from '@/lib/error-handler';
import { NotFoundError, ValidationError } from '@/lib/http-errors';
import { UserSchema } from '@/schemas/auth.schema';

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    await dbConnect();

    const validatedData = UserSchema.partial().safeParse({ email });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError('User');

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, 'api');
  }
}
