import { getGamePost, getPosts } from '@/actions/post';
import NoResults from '@/components/home/NoResults';
import PostCard from '@/components/home/PostCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { paths } from '@/lib/paths';
import Link from 'next/link';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const GamePosts = async ({ params }: { params: { gameId: string } }) => {
  return (
    <>
      <Link href={paths.post('CREATE')} className="flex justify-end max-sm:w-full">
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">게시글 작성</Button>
      </Link>
      <Suspense
        fallback={
          <div className="mt-10 flex w-full flex-col gap-6">
            <Skeleton className="h-[50px] w-full" />
            <Skeleton className="h-[50px] w-full" />
            <Skeleton className="h-[50px] w-full" />
          </div>
        }
      >
        <PostsWrapper gameId={params.gameId} />
      </Suspense>
    </>
  );
};

const PostsWrapper = async ({ gameId }: { gameId: string }) => {
  const gamePosts = await getGamePost({ gameId });

  if (!gamePosts) {
    return (
      <NoResults
        title="해당 게시글을 찾을 수 없습니다,,,"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
        href="/create-post"
        linkTitle="게시글 작성하러가기"
      />
    );
  }
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        {gamePosts.map((q) => (
          <PostCard
            key={q.id}
            id={q.id}
            title={q.title}
            tags={q.tags}
            author={q.author}
            comments={q.comments}
            upvotes={0}
            views={q.views}
            createdAt={q.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default GamePosts;
