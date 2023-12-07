import Link from 'next/link';
import NoResults from '@/components/home/NoResults';
import { ChevronRight } from 'lucide-react';
import { Game } from '@prisma/client';

interface GamesProps {
  fetchData: () => Promise<Game[] | null>;
  isShowImage: boolean;
}

export default async function GamesWrapper({ fetchData, isShowImage }: GamesProps) {
  const games = await fetchData();

  if (!games || games.length === 0) {
    return (
      <NoResults
        title="게임이 존재하지 않습니다,,,"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
        href="/"
        linkTitle="홈으로 돌아가기"
        isShowImage={isShowImage}
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
}
