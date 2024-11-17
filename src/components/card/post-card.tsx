import Link from 'next/link';
import React from 'react';
import { getTimeStamp } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { TagCard } from './tag-card';
import { Metric } from '../ui/metric';
import { PostType, TagType } from '@/types/post.type';
import { ThumbsUp, MessageSquare, Eye } from 'lucide-react';

interface PostCardProps {
  post: PostType;
}

export const PostCard = ({
  post: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: PostCardProps) => {
  return (
    <div className="rounded-lg border bg-white p-9 shadow-sm dark:bg-gray-800 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="line-clamp-1 flex text-sm text-gray-500 dark:text-gray-400 sm:hidden">
            {getTimeStamp(createdAt)}
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
          Icon={author.image}
          alt={author.name}
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="text-sm text-gray-500 dark:text-gray-400"
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            Icon={ThumbsUp}
            alt="like"
            value={upvotes}
            title=" Votes"
            textStyles="text-sm text-gray-500 dark:text-gray-400"
          />
          <Metric
            Icon={MessageSquare}
            alt="answers"
            value={answers}
            title=" Answers"
            textStyles="text-sm text-gray-500 dark:text-gray-400"
          />
          <Metric
            Icon={Eye}
            alt="views"
            value={views}
            title=" Views"
            textStyles="text-sm text-gray-500 dark:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};
