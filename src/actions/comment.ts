'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './user';
import { paths } from '@/lib/paths';

type CreateCommentProps = {
  content: string;
  postId: string;
  path: string;
};

type GetCommentsProps = {
  postId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
};

export async function createComment(data: CreateCommentProps) {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      return null;
    }

    const { content, postId, path } = data;

    await db.comment.create({ data: { content, authorId: profile.id, postId } });

    revalidatePath(paths.post('FETCH', postId));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getComments(data: GetCommentsProps) {
  try {
    const { postId, sortBy, page = 1, pageSize = 10 } = data;

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case 'highestUpvotes':
        sortOptions = { upvotes: 'desc' };
        break;
      case 'lowestUpvotes':
        sortOptions = { upvotes: 'asc' };
        break;
      case 'recent':
        sortOptions = { createdAt: 'desc' };
        break;
      case 'old':
        sortOptions = { createdAt: 'asc' };
        break;

      default:
        break;
    }

    const comments = await db.comment.findMany({
      where: {
        postId
      },
      include: {
        author: true
      },
      orderBy: sortOptions,
      skip: skipAmount,
      take: pageSize
    });

    const totalAnswer = comments.length;

    const isNextComment = totalAnswer > skipAmount + comments.length;

    return { comments, isNextComment };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
