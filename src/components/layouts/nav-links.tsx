'use client';

import { SheetClose } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants/layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const NavLinks = ({
  isMobileNav = false,
}: {
  isMobileNav?: boolean;
}) => {
  const pathname = usePathname();
  const userId = 1;

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === '/profile') {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? 'rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-gray-700 dark:text-gray-200',
              'flex items-center justify-start gap-4 bg-transparent p-4'
            )}
          >
            <item.icon
              size={20}
              className={cn(
                isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'
              )}
            />
            <p
              className={cn(
                isActive ? 'text-base font-bold' : 'text-base font-medium',
                !isMobileNav && 'max-lg:hidden'
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};
