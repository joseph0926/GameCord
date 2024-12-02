import { NextResponse } from 'next/server';
import Post from '@/database/post.model';
import dbConnect from '@/lib/db';
import handleError from '@/lib/error-handler';

export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find();

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    return handleError(error, 'api');
  }
}
