'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { NavLinks } from './nav-links';
import { ROUTES } from '@/constants/routes';
import { LogIn, UserPlus, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

export const LeftSidebar = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const sidebarVariants = {
    expanded: {
      width: '266px',
      transition: {
        type: 'tween',
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    collapsed: {
      width: '88px',
      transition: {
        type: 'tween',
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const toggleButtonVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: 180 },
  };

  return (
    <div className="relative flex h-screen">
      <motion.section
        initial={isMobile ? 'collapsed' : 'expanded'}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r border-gray-200 bg-white p-6 pt-36 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:shadow-none max-sm:hidden"
      >
        <div className="flex flex-1 flex-col gap-6">
          <NavLinks isCollapsed={isCollapsed} />
        </div>

        <div className="flex flex-col gap-3">
          <motion.div
            initial={false}
            animate={{ width: isCollapsed ? '40px' : '100%' }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            <Button
              className={cn(
                'min-h-[41px] rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium shadow-none hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600',
                isCollapsed ? 'w-10' : 'w-full'
              )}
              asChild
            >
              <Link
                href={ROUTES.SIGN_IN}
                className="flex items-center justify-center gap-2"
              >
                <LogIn size={20} className="text-black dark:invert" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                    >
                      로그인
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ width: isCollapsed ? '40px' : '100%' }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            <Button
              className={cn(
                'min-h-[41px] rounded-lg border-2 border-gray-200 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 shadow-none hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800',
                isCollapsed ? 'w-10' : 'w-full'
              )}
              asChild
            >
              <Link
                href={ROUTES.SIGN_UP}
                className="flex items-center justify-center gap-2"
              >
                <UserPlus size={20} className="dark:text-white" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      회원가입
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {!isMobile && (
        <motion.button
          initial="expanded"
          animate={isCollapsed ? 'collapsed' : 'expanded'}
          variants={toggleButtonVariants}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-44 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
};
