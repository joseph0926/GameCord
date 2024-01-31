import { getGames } from '@/actions/game';
import PostFrom from '@/components/post/PostForm';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';

const CreatePost = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">게시글 작성</h1>
      <div className="mt-9">
        <Suspense
          fallback={
            <div className="mt-10 flex w-full flex-col gap-6">
              {[1, 2, 3, 4, 5].map((num, idx) => (
                <Skeleton key={num} className="h-[50px] w-full" />
              ))}
            </div>
          }
        >
          <CreatePostWrapper />
        </Suspense>
      </div>
    </div>
  );
};

const CreatePostWrapper = async () => {
  const games = await getGames();

  return <PostFrom games={games} />;
};

export default CreatePost;
