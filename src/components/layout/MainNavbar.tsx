import ThemeToggle from '@/components/ui/theme-toggle';
import { Suspense } from 'react';
import { GlobalSearch } from '../home/global-search';

const MainNavbar = () => {
  return (
    <nav className="flex-between fixed left-36 z-50 w-[calc(100%-9rem)] gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Suspense>
        <GlobalSearch />
      </Suspense>
      <div className="flex-between gap-5">
        <ThemeToggle />
        {/* <UserButtonWrapper /> */}
        <Suspense fallback={<div />}></Suspense>
      </div>
    </nav>
  );
};

export default MainNavbar;
