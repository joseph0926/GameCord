import Link from 'next/link';
import React from 'react';
import RenderTag from './RenderTag';
import Metric from './Metric';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { format } from 'date-fns';
import { Profile } from '@prisma/client';

type PostCardProps = {
  id: string;
  title: string;
  tags: {
    id: string;
    name: string;
  }[];
  author: {
    id: string;
    profileId: string;
    imageUrl: string;
    name: string;
  };
  comments: Array<object>;
  upvotes: number;
  views: number;
  createdAt: Date;
  profileId: string;
};

const PostCard = ({ id, title, tags, author, comments, upvotes, views, createdAt }: PostCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-col">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">{format(createdAt, 'yyyy년-MM월-dd일')}</span>
          <Link href={`/post/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{title}</h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <RenderTag key={t.id} id={t.id} name={t.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.imageUrl}
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(upvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(comments.length)}
          title=" Comments"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default PostCard;
