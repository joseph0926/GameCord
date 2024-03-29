import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import ParseHTML from '@/components/post/ParseHTML';
import { getComments } from '@/actions/comment';
import { CommentFilters } from '@/lib/filters';
import Filter from '@/components/home/Filter';
import Pagination from '@/components/layout/Pagination';
import { ListLoading } from '../ui/list-loading';

type CommentsProps = {
  postId: string;
  totalComments?: number;
  page?: string;
  filter?: string;
};

const Comments = ({ postId, totalComments, page, filter }: CommentsProps) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalComments} Comments</h3>
        <Filter filters={CommentFilters} />
      </div>
      <React.Suspense fallback={<ListLoading num={2} />}>
        <Comment postId={postId} page={page} filter={filter} />
      </React.Suspense>
    </div>
  );
};

const Comment = async ({ postId, page, filter }: CommentsProps) => {
  const { comments, isNextComment } = await getComments({
    postId,
    page: page ? +page : 1,
    sortBy: filter
  });

  return (
    <>
      <div>
        {comments.map((comment) => (
          <article key={comment.id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:w-full sm:flex-row sm:items-center sm:gap-2">
                <Link href={`/profile/${comment.author.profileId}`} className="flex flex-1 items-start gap-1 sm:items-center">
                  <Image
                    src={comment.author.imageUrl}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex w-full !flex-col sm:!flex-row sm:items-center sm:justify-between">
                    <p className="body-semibold text-dark300_light700">{comment.author.name}</p>
                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      commented {getTimestamp(comment.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end"></div>
              </div>
            </div>
            <ParseHTML data={comment.content} />
          </article>
        ))}
      </div>
      <div className="mt-10 w-full">
        <Pagination pageNumber={page ? +page : 1} isNext={isNextComment} />
      </div>
    </>
  );
};

export default Comments;
