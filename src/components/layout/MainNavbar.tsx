import Image from 'next/image';
import Link from 'next/link';
import GlobalSearch from '@/components/home/GlobalSearch';
import ThemeToggle from '@/components/ui/theme-toggle';
import MainMobileNavbar from '@/components/layout/MainMobileNavbar';
import { getServers } from '@/actions/server';
import { Suspense } from 'react';
import UserButtonWrapper from './UserButtonWrapper';
import { getGames } from '@/actions/game';

const MainNavbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/images/logo.png" width={30} height={30} alt="GameCord" />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Game<span className="text-primary-500">Cord</span>
        </p>
      </Link>
      <Suspense>
        <GlobalSearch />
      </Suspense>
      <div className="flex-between gap-5">
        <ThemeToggle />
        <UserButtonWrapper />
        <Suspense fallback={<div />}>
          <MainMobileNavbarWrapper />
        </Suspense>
      </div>
    </nav>
  );
};

const MainMobileNavbarWrapper = async () => {
  const servers = await getServers();
  const games = await getGames();

  return <MainMobileNavbar servers={servers} games={games} />;
};

export default MainNavbar;
