"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { SocialAuthForm } from "../forms/social-form";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-gray-950/50 p-6 sm:p-8 backdrop-blur-sm"
    >
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-3">
          <motion.h1
            className="text-3xl font-bold text-slate-900 dark:text-white"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
          >
            GameCord
          </motion.h1>
          <motion.p
            className="text-sm text-slate-600 dark:text-slate-300"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4 }}
          >
            게임 토론 스레드와 실시간 커뮤니케이션 기능을 하나로 결합한 최적의
            공간을 만나보세요!
          </motion.p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {/* <Image
              src="images/site-logo.svg"
              alt="DevFlow Logo"
              width={60}
              height={60}
              className="object-contain hover:rotate-12 transition-transform duration-300"
            /> */}
        </motion.div>
      </motion.div>

      {children}

      <SocialAuthForm />
    </motion.section>
  );
};
