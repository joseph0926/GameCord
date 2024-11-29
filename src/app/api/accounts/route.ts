import { NextResponse } from 'next/server';
import Account from '@/database/account.model';
import dbConnect from '@/lib/db';
import handleError from '@/lib/error-handler';
import { ForbiddenError } from '@/lib/http-errors';
import { AccountSchema } from '@/schemas/auth.schema';

export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, 'api');
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });

    if (existingAccount) throw new ForbiddenError('이미 존재하는 계정입니다.');

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, 'api');
  }
}
