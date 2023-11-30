import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import RightSidebar from '@/components/layout/RightSidebar';
import { NotificationModal } from '@/components/modal/NotificationModal';
import LeftSidebarWrapper from '@/components/layout/LeftSidebarWrapper';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-light-850 dark:bg-dark-100">
      <NotificationModal />
      <MainNavbar />
      <div className="flex">
        <LeftSidebarWrapper />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default MainLayout;
