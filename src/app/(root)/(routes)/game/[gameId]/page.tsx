import Link from 'next/link';
import { Suspense } from 'react';
import GamePostsWrapper from '@/components/game/game-posts-wrapper';
import { Button } from '@/components/ui/button';
import { ListLoading } from '@/components/ui/list-loading';
import { paths } from '@/lib/paths';

export const dynamic = 'force-dynamic';

const GamePosts = async ({ params }: { params: { gameId: string } }) => {
  return (
    <>
      <Link href={paths.post('CREATE')} className="flex justify-end max-sm:w-full">
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">게시글 작성</Button>
      </Link>
      <Suspense fallback={<ListLoading num={5} />}>
        <GamePostsWrapper gameId={params.gameId} />
      </Suspense>
    </>
  );
};

export default GamePosts;
