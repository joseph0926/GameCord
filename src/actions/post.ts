'use server';

export type GetPostsProps = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
};

export type CreatePostProps = {
  title: string;
  content: string;
  tagNames: string[];
  path: string;
  gameId: string;
};

export type GetUserPostsProps = {
  profileId: string;
  page?: number;
  pageSize?: number;
};

export type GetPostProps = {
  postId: string;
};

export type GetGamePostProps = {
  gameId: string;
};

export type PostsWithData = Post & {
  author: Profile;
  comments: Comment[];
  tags: Tag[];
};

import React from 'react';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './user';
import { paths } from '@/lib/paths';
import { Comment, Post, Profile, Tag } from '@prisma/client';

export async function createPost(data: CreatePostProps) {
  try {
    const profile = await getCurrentUser();

    const { title, content, tagNames, gameId, path } = data;

    const post = await db.post.create({
      data: {
        title,
        content,
        authorId: profile.id,
        gameId
      }
    });

    const tags = await db.tag.findMany({
      where: {
        name: {
          in: tagNames
        }
      }
    });

    const newOrExistingTags = await Promise.all(
      tagNames.map(async (name) => {
        const existingTag = tags.find((tag) => tag.name === name);

        if (existingTag) {
          return existingTag;
        } else {
          return await db.tag.create({ data: { name, postId: post.id, description: '' } });
        }
      })
    );

    await db.post.update({
      where: {
        id: post.id
      },
      data: {
        tags: {
          connect: newOrExistingTags.map((tag) => ({ id: tag.id }))
        }
      }
    });

    revalidatePath(paths.post('ALL'));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPosts(): Promise<PostsWithData[] | null> {
  try {
    const posts = await db.post.findMany({
      where: {},
      include: {
        tags: true,
        author: true,
        comments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserPosts(data: GetUserPostsProps) {
  try {
    const { profileId, page = 1, pageSize = 10 } = data;

    const skipAmount = (page - 1) * pageSize;

    const userPosts = await db.post.findMany({
      where: {
        authorId: profileId
      },
      orderBy: [{ views: 'desc' }, { updatedAt: 'desc' }],
      skip: skipAmount,
      take: pageSize,
      include: {
        tags: {
          select: {
            id: true,
            name: true
          }
        },
        author: {
          select: {
            id: true,
            profileId: true,
            name: true,
            imageUrl: true
          }
        }
      }
    });

    const isNextPosts = userPosts.length > skipAmount + userPosts.length;

    return { posts: userPosts, isNextPosts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getPost = React.cache(async (data: GetPostProps) => {
  try {
    const { postId } = data;

    const post = await db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        tags: true,
        author: true,
        comments: true
      }
    });

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getGamePost = async (data: GetGamePostProps): Promise<PostsWithData[] | null> => {
  try {
    const { gameId } = data;

    const posts = await db.post.findMany({
      where: {
        gameId
      },
      include: {
        tags: true,
        author: true,
        comments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSearchPosts = async (term: string): Promise<PostsWithData[] | null> => {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }]
    },
    include: {
      tags: true,
      author: true,
      comments: true
    }
  });
};
