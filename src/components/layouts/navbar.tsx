import Link from 'next/link';
import React from 'react';
import { MobileNavbar } from './mobile-navbar';
import Theme from '@/components/ui/theme';

export const Navbar = () => {
  return (
    <nav className="fixed z-50 flex w-full items-center justify-between gap-5 bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <h1>Logo</h1>
        <p className="font-['Space_Grotesk'] text-2xl font-bold text-gray-900 dark:text-gray-50 max-sm:hidden">
          <span className="text-blue-500">Game</span>Cord
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex items-center justify-between gap-5">
        <Theme />
        <MobileNavbar />
      </div>
    </nav>
  );
};
