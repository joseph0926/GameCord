'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SheetClose } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants/layout';
import { cn } from '@/lib/utils';

export const NavLinks = ({
  isMobileNav = false,
  isCollapsed = false,
}: {
  isMobileNav?: boolean;
  isCollapsed?: boolean;
}) => {
  const pathname = usePathname();
  const userId = 1;

  const linkVariants = {
    expanded: {
      width: '100%',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    collapsed: {
      width: '48px',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.href) && item.href.length > 1) ||
          pathname === item.href;

        if (item.href === '/profile') {
          if (userId) item.href = `${item.href}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <motion.div
            variants={linkVariants}
            initial={false}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={item.href}
              key={item.label}
              className={cn(
                isActive
                  ? 'rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'text-gray-700 dark:text-gray-200',
                'flex items-center justify-start gap-4 bg-transparent p-4',
                isCollapsed && 'justify-center'
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'
                )}
              />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.p
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      isActive
                        ? 'text-base font-bold'
                        : 'text-base font-medium',
                      !isMobileNav && 'max-lg:hidden',
                      'overflow-hidden whitespace-nowrap'
                    )}
                  >
                    {item.label}
                  </motion.p>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.href}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.href}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};
