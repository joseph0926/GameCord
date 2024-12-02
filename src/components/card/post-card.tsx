import { MessageSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from '@/constants/routes';
import { PostType, TagType } from '@/types/post.type';
import { Metric } from '../ui/metric';
import { PostTime } from './post-time';
import { TagCard } from './tag-card';

interface PostCardProps {
  post: PostType;
}

export const PostCard = ({
  post: { _id, title, tags, author, createdAt, upvotes, comments },
}: PostCardProps) => {
  return (
    <div className="rounded-lg border bg-white p-9 shadow-sm dark:bg-gray-800 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="line-clamp-1 flex text-sm text-gray-500 dark:text-gray-400 sm:hidden">
            <PostTime date={new Date(createdAt)} />
          </span>

          <Link href={ROUTES.POST(_id)}>
            <h3 className="line-clamp-1 flex-1 text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: TagType) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className="mt-6 flex w-full flex-wrap justify-between gap-3">
        <Metric
          Icon={author.image || ''}
          alt={author.name}
          value={author.name}
          title={``}
          titleComponent={<PostTime date={new Date(createdAt)} />}
          href={ROUTES.PROFILE(author._id)}
          textStyles="text-sm text-gray-500 dark:text-gray-400"
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            Icon={ThumbsUp}
            alt="like"
            value={upvotes.length}
            title=" 좋아요"
            textStyles="text-sm text-gray-500 dark:text-gray-400"
          />
          <Metric
            Icon={MessageSquare}
            alt="comments"
            value={comments?.length}
            title=" 댓글"
            textStyles="text-sm text-gray-500 dark:text-gray-400"
          />
          {/* <Metric
            Icon={Eye}
            alt="views"
            value={views}
            title=" 조회수"
            textStyles="text-sm text-gray-500 dark:text-gray-400"
          /> */}
        </div>
      </div>
    </div>
  );
};
