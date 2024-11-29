'use server';

import { auth } from '@/auth';
import Post from '@/database/post.model';
import handleError from '@/lib/error-handler';
import logger from '@/lib/logger';
import { CreatePostSchema } from '@/schemas/post.schema';
import { ActionResponse } from '@/types/api.type';
import { PostPayload } from '@/types/post.type';
import action from './action.handler';

export async function createPost(params: PostPayload): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: CreatePostSchema });
  if (validationResult instanceof Error) {
    return handleError(validationResult);
  }

  const { content, title, tags } = validationResult.params!;
  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error('로그인 후 게시글을 생성할 수 있습니다.');
    }
    // TODO: subcord 생성 로직 추가

    const [post] = await Post.create([
      { title, content, tags, subcordId: 'test', authorId: session.user.id },
    ]);
    return {
      data: post,
      success: true,
    };
  } catch (error) {
    logger.error(error);
    return handleError(error);
  }
}
