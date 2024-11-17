import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { NavLinks } from './nav-links';
import { ROUTES } from '@/constants/routes';
import { LogIn, UserPlus } from 'lucide-react';

export const LeftSidebar = () => {
  return (
    <section className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r border-gray-200 bg-white p-6 pt-36 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          className="min-h-[41px] w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium shadow-none hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          asChild
        >
          <Link
            href={ROUTES.SIGN_IN}
            className="flex items-center justify-center gap-2"
          >
            <LogIn size={20} className="dark:invert lg:hidden" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent max-lg:hidden">
              Log In
            </span>
          </Link>
        </Button>
        <Button
          className="min-h-[41px] w-full rounded-lg border-2 border-gray-200 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 shadow-none hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          asChild
        >
          <Link
            href={ROUTES.SIGN_UP}
            className="flex items-center justify-center gap-2"
          >
            <UserPlus size={20} className="dark:invert lg:hidden" />
            <span className="max-lg:hidden">Sign Up</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};
