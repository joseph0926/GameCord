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
        <h1 className="h1-bold text-dark100_light900">GameCord</h1>
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
    <ul className="divide-background-light700_dark400 mt-8 divide-y">
      {games.map((game) => (
        <li key={game.id} className="hover:background-light800_dark400 relative my-2 py-5">
          <div className="mx-auto flex max-w-7xl justify-between gap-x-6 px-4 sm:px-6 lg:px-8">
            <div className="flex gap-x-4">
              <img className="bg-background-light800_dark400 h-12 w-12 flex-none rounded-full" src={game.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-text-dark100_light900 text-sm font-semibold leading-6">
                  <Link href={`/game/${game.id}`}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {game.title}
                  </Link>
                </p>
                <p className="text-text-dark300_light700 mt-1 flex text-xs leading-5"></p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-text-dark100_light900 text-sm leading-6">{game.category}</p>
              </div>
              <ChevronRight className="text-text-dark300_light700 h-5 w-5 flex-none" aria-hidden="true" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MainPage;
