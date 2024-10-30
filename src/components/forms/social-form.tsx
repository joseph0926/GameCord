"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import React from "react";
import ROUTES from "@/constants/routes";
import { Button } from "../ui/button";
import { buttonVariants } from "@/constants/animation";
import { toast } from "sonner";

export const SocialAuthForm = () => {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error instanceof Error ? error.message : "로그인에 실패하였습니다."
      );
    }
  };

  return (
    <div className="mt-8 space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-slate-500 dark:text-slate-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => handleSignIn("github")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
          >
            <Image
              src="/icons/github.svg"
              alt="Github Logo"
              width={20}
              height={20}
              className="dark:invert"
            />
            <span>Github</span>
          </Button>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => handleSignIn("google")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
          >
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            <span>Google</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
