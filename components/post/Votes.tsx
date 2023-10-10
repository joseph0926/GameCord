'use client';

import { downVotePost, upVotePost } from '@/actions/vote';
import { useOrigin } from '@/hooks/useOrigin';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

type VotesProps = {
  type: 'Post' | 'Comment';
  itemId: string;
  profileId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
};

const Votes = ({ type, itemId, profileId, upvotes, hasUpVoted, downvotes, hasDownVoted }: VotesProps) => {
  const origin = useOrigin();

  const voteHandler = async (action: string) => {
    if (!profileId) {
      return;
    }

    if (action === 'upvote') {
      if (type === 'Post') {
        await upVotePost({
          postId: itemId,
          profileId,
          hasUpVoted,
          hasDownVoted,
          path: `${origin}/post/${itemId}`
        });
      }
      if (type === 'Comment') {
      }
    }
    if (action === 'downvote') {
      if (type === 'Post') {
        await downVotePost({
          postId: itemId,
          profileId,
          hasUpVoted,
          hasDownVoted,
          path: `${origin}/post/${itemId}`
        });
      }
      if (type === 'Comment') {
      }
    }

    return;
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={hasUpVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}
            width={18}
            height={18}
            alt="upvote"
            onClick={() => voteHandler('upvote')}
            className="cursor-pointer"
          />
          <div className="flex-center min-h-[18px] rounded-sm p-1">
            <p className="text-dark400_light900">{formatAndDivideNumber(upvotes)}</p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={hasDownVoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}
            width={18}
            height={18}
            alt="downvote"
            onClick={() => voteHandler('downvote')}
            className="cursor-pointer"
          />
          <div className="flex-center min-h-[18px] rounded-sm p-1">
            <p className="text-dark400_light900">{formatAndDivideNumber(downvotes)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votes;
