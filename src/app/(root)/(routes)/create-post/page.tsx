import { getGames } from '@/actions/game';
import { getCurrentUser } from '@/actions/user';
import PostFrom from '@/components/post/PostForm';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
  const profile = await getCurrentUser();
  if (!profile) {
    redirect('/sign-in');
  }

  const games = await getGames();

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">게시글 작성</h1>

      <div className="mt-9">
        <PostFrom games={games} />
      </div>
    </div>
  );
};

export default Page;
