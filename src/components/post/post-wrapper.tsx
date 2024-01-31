'use client';

import { PostProps } from '@/app/(root)/(routes)/post/[postId]/page';
import NoResults from '../home/NoResults';
import Link from 'next/link';
import Image from 'next/image';
import { paths } from '@/lib/paths';
import Metric from '../home/Metric';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import ParseHTML from './ParseHTML';
import RenderTag from '../home/RenderTag';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function PostWrapper({ post }: PostProps) {
  const [vote, setVote] = useState<{
    commentId: string | null;
    createdAt: string;
    id: string | null;
    postId: string | null;
    profileId: string | null;
    type: string | null;
    updatedAt: string;
    voteCount: number;
  } | null>(null);

  if (!post) {
    return (
      <NoResults
        title="해당 게시글을 찾을 수 없습니다,,,"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
        href="/post"
        linkTitle="게시글 리스트로 돌아가기"
      />
    );
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/vote', {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ postId: post.id })
      });
      return await res.json();
    },
    onSuccess: (newData) => setVote(newData)
  });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={paths.profile('USER', post.author.id)} className="flex items-center justify-start gap-1">
            <Image src={post.author.imageUrl} className="rounded-full" width={22} height={22} alt="profile" />
            <p className="paragraph-semibold text-dark300_light700">{post.author.name}</p>
          </Link>
          <div className="flex justify-end gap-4">
            <div className="flex cursor-pointer items-center gap-1" onClick={() => mutate()}>
              <Image src="/assets/icons/upvote.svg" alt="upvote" width={18} height={18} />
              <span>{vote?.voteCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/downvote.svg" alt="downvote" width={18} height={18} />
              <span>{0}</span>
            </div>
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{post.title}</h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` posted ${getTimestamp(post.createdAt)}`}
          title=" Posted"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(post.comments.length)}
          title=" Comments"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(post.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={post.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((tag: any) => (
          <RenderTag key={tag.id} id={tag.id} name={tag.name} showCount={false} />
        ))}
      </div>
    </>
  );
}
