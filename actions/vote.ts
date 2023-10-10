'use server';

import { db } from '@/lib/db';
import { VoteType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type VotePostProps = {
  postId: string;
  profileId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path: string;
};

export async function upVotePost(data: VotePostProps) {
  try {
    const { path, postId, profileId, hasUpVoted, hasDownVoted } = data;

    const post = await db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        votes: true
      }
    });
    if (!post) {
      return null;
    }

    const upvotes = post.votes.filter((vote) => vote.type === VoteType.UPVOTE);
    const downvotes = post.votes.filter((vote) => vote.type === VoteType.DOWNVOTE);

    let voteData = {} as any;
    if (hasUpVoted) {
      const voteId = upvotes.find((vote) => vote.profileId === profileId)?.id;
      voteData = {
        delete: [{ id: voteId }]
      };
    } else if (hasDownVoted) {
      const voteId = downvotes.find((vote) => vote.profileId === profileId)?.id;
      voteData = {
        delete: [{ id: voteId, type: VoteType.DOWNVOTE }],
        create: [{ profileId, type: VoteType.UPVOTE }]
      };
    } else {
      voteData = {
        create: [{ type: VoteType.UPVOTE, profileId }]
      };
    }

    await db.post.update({
      where: {
        id: post.id
      },
      data: {
        votes: voteData
      }
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downVotePost(data: VotePostProps) {
  try {
    const { path, postId, profileId, hasUpVoted, hasDownVoted } = data;

    const post = await db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        votes: true
      }
    });
    if (!post) {
      return null;
    }

    const upvotes = post.votes.filter((vote) => vote.type === VoteType.UPVOTE);
    const downvotes = post.votes.filter((vote) => vote.type === VoteType.DOWNVOTE);

    let voteData = {} as any;
    if (hasDownVoted) {
      const voteId = downvotes.find((vote) => vote.profileId === profileId)?.id;
      voteData = {
        delete: [{ id: voteId, type: VoteType.DOWNVOTE }]
      };
    } else if (hasUpVoted) {
      const voteId = upvotes.find((vote) => vote.profileId === profileId)?.id;
      voteData = {
        delete: [{ id: voteId, type: VoteType.UPVOTE }],
        create: [{ profileId, type: VoteType.DOWNVOTE }]
      };
    } else {
      voteData = {
        create: [{ type: VoteType.UPVOTE, profileId }]
      };
    }

    await db.post.update({
      where: {
        id: post.id
      },
      data: {
        votes: voteData
      }
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
