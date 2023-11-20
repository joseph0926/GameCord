import React, { Suspense } from 'react';
import { getGames } from '@/actions/game';
import { getServers } from '@/actions/server';
import { getCurrentUser } from '@/actions/user';
import LeftSidebar from '@/components/layout/LeftSidebar';
import MainNavbar from '@/components/layout/MainNavbar';
import RightSidebar from '@/components/layout/RightSidebar';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-light-850 dark:bg-dark-100">
      <Suspense fallback={<MainNavbar profileId="" games={null} servers={null} isStatic={true} />}>
        <LayoutWrapper isNav />
      </Suspense>
      <div className="flex">
        <Suspense
          fallback={
            <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"></section>
          }
        >
          <LayoutWrapper isNav={false} />
        </Suspense>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

const LayoutWrapper = async ({ isNav }: { isNav: boolean }) => {
  const profile = await getCurrentUser();
  const games = await getGames();
  const servers = await getServers();

  return isNav ? (
    <MainNavbar profileId={profile?.id} servers={servers} games={games} isStatic={false} />
  ) : (
    <LeftSidebar profileId={profile?.id} games={games} servers={servers} />
  );
};

export default MainLayout;
