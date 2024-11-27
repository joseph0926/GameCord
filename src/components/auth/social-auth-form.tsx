'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';
import { buttonVariants } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { Button } from '../ui/button';

export const SocialAuthForm = () => {
  const buttonClass =
    'relative w-full overflow-hidden min-h-12 flex-1 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-base font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700';

  const handleSignIn = async (provider: 'github' | 'google') => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다'
      );
    }
  };

  return (
    <motion.div
      className="mt-10 flex flex-wrap gap-2.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="flex-1"
      >
        <Button className={buttonClass} onClick={() => handleSignIn('google')}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
          <Image
            src="/icons/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2.5 object-contain invert-0 dark:invert"
          />
          <span>Google 로그인</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
