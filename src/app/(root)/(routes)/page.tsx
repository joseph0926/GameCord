import { Suspense } from 'react';
import Link from 'next/link';
import Filter from '@/components/home/Filter';
import HomeFilters from '@/components/home/HomeFilters';
import GamesWrapper from '@/components/game/games-wrapper';
import { Button } from '@/components/ui/button';
import { ListLoading } from '@/components/ui/list-loading';
import { HomePageFilters } from '@/lib/filters';
import { paths } from '@/lib/paths';
import { getGames } from '@/actions/game';

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
        <Filter filters={HomePageFilters} otherClassName="min-h-[56px] sm:min-w-[170px]" containerClassName="hidden max-md:flex" />
      </div>
      <HomeFilters />
      <Suspense fallback={<ListLoading num={5} />}>
        <GamesWrapper fetchData={getGames} isShowImage={true} />
      </Suspense>
    </>
  );
};

export default MainPage;
