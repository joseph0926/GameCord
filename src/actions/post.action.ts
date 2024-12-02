'use server';

import { Types } from 'mongoose';
import { auth } from '@/auth';
import Post from '@/database/post.model';
import Tag, { type ITagDoc } from '@/database/tag.model';
import handleError from '@/lib/error-handler';
import logger from '@/lib/logger';
import { CreatePostSchema } from '@/schemas/post.schema';
import { ActionResponse } from '@/types/api.type';
import { PostPayload } from '@/types/post.type';
import action from './action.handler';

type SerializedPost = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  media: {
    type: 'image' | 'video' | 'clip';
    url: string;
  }[];
  upvotes: string[];
  downvotes: string[];
};

export async function createPost(
  params: PostPayload
): Promise<ActionResponse<SerializedPost>> {
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

    const normalizedTags = tags.map((tag) => tag.toLowerCase());
    const exsitingTags: ITagDoc[] = await Tag.find({
      name: { $in: normalizedTags },
    });
    const existingTagNames = new Set(exsitingTags.map((tag) => tag.name));
    const tagsToCreate = normalizedTags.filter(
      (tag) => !existingTagNames.has(tag)
    );
    const newTagDocs = tagsToCreate.map((tag) => ({
      name: tag,
      followers: 0,
      posts: [],
    }));
    const newTags: ITagDoc[] = await Tag.create(newTagDocs);

    const allTags = [...exsitingTags, ...newTags];
    const tagIds = allTags.map((tag) => tag._id);

    const [post] = await Post.create([
      {
        title,
        content,
        tags: tagIds,
        author: session.user.id,
      },
    ]);

    await Promise.all([
      ...exsitingTags.map((tag) =>
        Tag.findByIdAndUpdate(tag._id, { $push: { posts: post._id } })
      ),
      ...newTags.map((tag) =>
        Tag.findByIdAndUpdate(tag._id, { $push: { posts: post._id } })
      ),
    ]);

    const serializedPost: SerializedPost = {
      _id: post._id.toString(),
      title: post.title,
      content: post.content,
      tags: post.tags.map((tag: ITagDoc) => tag.toString()),
      author: post.author.toString(),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      media: post.media || [],
      upvotes: post.upvotes.map((id: Types.ObjectId) => id.toString()),
      downvotes: post.downvotes.map((id: Types.ObjectId) => id.toString()),
    };

    return {
      data: serializedPost,
      success: true,
    };
  } catch (error) {
    logger.error(error);
    return handleError(error);
  }
}
