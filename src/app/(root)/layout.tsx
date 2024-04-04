import { FloatingMenu } from '@/components/layout/floating-menu';
import LeftSidebar from '@/components/layout/left-sidebar';
import React from 'react';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen w-full bg-gray-800 text-white dark:bg-gray-100 dark:text-black">
        <div className="sticky left-0 top-0 h-full w-[15rem]">
          <LeftSidebar />
        </div>
        {children}
      </div>
      <FloatingMenu />
    </>
  );
}
