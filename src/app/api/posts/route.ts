import { NextResponse } from 'next/server';
import Post from '@/database/post.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';
import dbConnect from '@/lib/db';
import handleError from '@/lib/error-handler';

export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find({})
      .select({
        title: 1,
        createdAt: 1,
        views: 1,
        upvotes: { $size: '$upvotes' },
        // comments: { $size: '$comments' },
      })
      .populate({
        path: 'author',
        model: User,
        select: 'name username image',
      })
      .populate({
        path: 'tags',
        model: Tag,
        select: 'name',
      })
      .sort({ createdAt: -1 })
      .lean();

    // const postsWithComments = await Promise.all(
    //   posts.map(async (post) => {
    //     const comments = await Comment.find({ postId: post._id })
    //       .populate({
    //         path: 'authorId',
    //         model: User,
    //         select: 'name username image reputation',
    //       })
    //       .populate({
    //         path: 'parentId',
    //         model: Comment,
    //       })
    //       .lean();

    //     const commentTree = comments.reduce((acc, comment) => {
    //       if (!comment.parentId) {
    //         return {
    //           ...acc,
    //           [comment._id.toString()]: {
    //             ...comment,
    //             replies: [],
    //           },
    //         };
    //       }

    //       const parentId = comment.parentId._id.toString();
    //       if (acc[parentId]) {
    //         acc[parentId].replies.push(comment);
    //       }
    //       return acc;
    //     }, {});

    //     return {
    //       ...post,
    //       comments: Object.values(commentTree),
    //     };
    //   })
    // );
    return NextResponse.json(
      {
        success: true,
        data: posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, 'api');
  }
}
