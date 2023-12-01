import { getGames } from '@/actions/game';
import { getPosts } from '@/actions/post';
import { getCurrentUser } from '@/actions/user';
import Filter from '@/components/home/Filter';
import HomeFilters from '@/components/home/HomeFilters';
import NoResults from '@/components/home/NoResults';
import PostCard from '@/components/home/PostCard';
import LocalSearchbar from '@/components/layout/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HomePageFilters } from '@/lib/filters';
import { paths } from '@/lib/paths';
import { currentUser } from '@clerk/nextjs';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MainPage = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-col sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Best Posts</h1>
        <Link href={paths.post('CREATE')} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">게시글 작성</Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar route="/" iconPosition="left" imgSrc="/assets/icons/search.svg" placeholder="search,,," otherClassName="flex-1" />
        <Filter filters={HomePageFilters} otherClassName="min-h-[56px] sm:min-w-[170px]" containerClassName="hidden max-md:flex" />
      </div>
      <HomeFilters />
      <React.Suspense
        fallback={
          <div className="mt-10 flex w-full flex-col gap-6">
            <Skeleton className="h-[50px] w-full" />
            <Skeleton className="h-[50px] w-full" />
            <Skeleton className="h-[50px] w-full" />
          </div>
        }
      >
        <Games />
      </React.Suspense>
    </>
  );
};

const Posts = async () => {
  const { posts } = await getPosts({});

  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {posts.length > 0 ? (
        posts
          .slice(0, 3)
          .map((q) => (
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
          ))
      ) : (
        <NoResults
          title="해당 게시글을 찾을 수 없습니다,,,"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
          href="/create-post"
          linkTitle="게시글 작성하러가기"
        />
      )}
    </div>
  );
};

const Games = async () => {
  const games = await getGames();
  if (!games) {
    return (
      <NoResults
        title="게임이 존재하지 않습니다,,,"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
        href="/"
        linkTitle="홈으로 돌아가기"
      />
    );
  }

  return (
    <ul className="mt-8 divide-y divide-gray-100">
      {games.map((game) => (
        <li key={game.id} className="relative my-2 py-5 hover:bg-gray-50">
          <div className="mx-auto flex max-w-7xl justify-between gap-x-6 px-4 sm:px-6 lg:px-8">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={game.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <Link href={`/${game.id}`}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {game.title}
                  </Link>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {/* <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                      {person.email}
                    </a> */}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{game.category}</p>
              </div>
              <ChevronRight className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MainPage;
