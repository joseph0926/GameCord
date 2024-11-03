"use client";

import { motion, Variants } from "framer-motion";
import { memo } from "react";

export const AuthBg = memo(() => {
  const floatingVariants: Variants = {
    initial: { scale: 0.95, opacity: 0.5 },
    animate: {
      scale: 1.05,
      opacity: 0.8,
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      },
    },
  };

  const moveVariants: Variants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 30,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      },
    },
  };

  return (
    <>
      <div className="absolute inset-0 h-full dark:opacity-0 overflow-hidden">
        <div className="absolute inset-0 h-full bg-gradient-to-r from-violet-200 via-pink-200 to-cyan-200" />

        <motion.div
          variants={moveVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(168,85,247,0.1),rgba(59,130,246,0.1),transparent)] blur-xl"
          style={{ willChange: "transform" }}
        />

        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-fuchsia-400/20 via-violet-400/20 to-indigo-400/20 rounded-full blur-2xl"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="absolute inset-0 opacity-0 dark:opacity-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950" />

        <motion.div
          variants={moveVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(59,130,246,0.05),rgba(139,92,246,0.05),transparent)] blur-xl"
          style={{ willChange: "transform" }}
        />

        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-violet-900/20 rounded-full blur-2xl"
          style={{ willChange: "transform" }}
        />
      </div>
    </>
  );
});

AuthBg.displayName = "AuthBg";
