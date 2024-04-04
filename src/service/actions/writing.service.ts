'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { postSchema } from '@/lib/validations/post.schema';
import { auth } from '@/auth';

type CreatePostType = {
  title: string;
  content: string;
  tagNames: string[];
  path: string;
};

export const createPost = async (values: CreatePostType) => {
  try {
    const { tagNames, title, content } = values;
    if (!title || !content) {
      return {
        status: 400,
        message: '제목 또는 컨텐츠가 존재하지 않습니다',
        data: null
      };
    }

    const session = await auth();
    if (!session || !session.user.id) {
      return {
        status: 401,
        message: '회원가입된 유저만 작성 가능합니다.',
        data: null
      };
    }

    const post = await db.post.create({
      data: {
        title,
        content,
        tags: tagNames,
        userId: session.user.id
      }
    });

    return {
      status: 200,
      message: '게시글이 성공적으로 등록되었습니다.',
      data: { post }
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: '알 수 없는 에러가 발생하였습니다.',
      data: null
    };
  }
};
