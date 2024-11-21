'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/constants/auth';
import { SocialAuthForm } from './social-auth-form';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full rounded-lg border border-zinc-200/50 bg-white/80 px-4 py-10 shadow-lg backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-800/80 sm:w-[520px] sm:px-8"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-2"
      >
        <div className="space-y-2.5">
          <motion.h1
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent"
          >
            GameCord
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base text-zinc-600 dark:text-zinc-300"
          >
            GameCord는 게이머들이 좋아하는 게임에 대해 깊이 있는 토론을 나누고,
            실시간으로 소통하며, 게임 관련 콘텐츠를 공유할 수 있는 통합 환경을
            제공합니다.
          </motion.p>
        </div>
      </motion.div>
      {children}
      <SocialAuthForm />
    </motion.section>
  );
};
