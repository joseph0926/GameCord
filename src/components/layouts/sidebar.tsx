'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, Gamepad2, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Theme } from '@/components/ui/theme';
import { sidebarLinks } from '@/constants/layout';
import { cn } from '@/lib/utils';
import { MobileNavbar } from './mobile-navbar';
import { NavItem } from './nav-item';

export const Sidebar = () => {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const sidebarVariants = {
    expanded: {
      width: '220px',
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    collapsed: {
      width: '80px',
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  };

  const toggleButtonVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: 180 },
  };

  return (
    <>
      <motion.aside
        initial="expanded"
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        className="scrollbar-thin relative z-40 hidden h-screen flex-col justify-between border-r border-gray-200 bg-white p-4 pt-20 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:flex"
      >
        <nav className="flex flex-1 flex-col gap-2">
          <div className="mb-8 flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-['Space_Grotesk'] text-2xl font-bold"
                >
                  <span className="text-blue-500">Game</span>
                  <span className="text-gray-900 dark:text-gray-50">Cord</span>
                </motion.p>
              )}
            </Link>
          </div>

          {sidebarLinks.map((item) => (
            <NavItem key={item.href} isCollapsed={isCollapsed} item={item} />
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            onClick={() => router.push('/sign-in')}
            className={cn(
              'w-full justify-start gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600',
              isCollapsed && 'justify-center'
            )}
          >
            <LogIn className="h-5 w-5" />
            {!isCollapsed && (
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                로그인
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/sign-up')}
            className={cn(
              'w-full justify-start gap-2 border-2',
              isCollapsed && 'justify-center'
            )}
          >
            <UserPlus className="h-5 w-5" />
            {!isCollapsed && <span>회원가입</span>}
          </Button>

          <div className="mt-4 flex items-center justify-center">
            <Theme />
          </div>
        </div>

        <motion.button
          initial="expanded"
          animate={isCollapsed ? 'collapsed' : 'expanded'}
          variants={toggleButtonVariants}
          onClick={() => setIsCollapsed((prevState) => !prevState)}
          className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>
      </motion.aside>
      <MobileNavbar />
    </>
  );
};
