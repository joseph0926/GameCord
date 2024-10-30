"use client";

import { motion, Variants } from "framer-motion";

export const AuthBg = () => {
  // 움직이는 애니메이션을 위한 variants
  const floatingVariants: Variants = {
    initial: { scale: 0.95, opacity: 0.5 },
    animate: {
      scale: 1.05,
      opacity: 0.8,
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const moveLeftToRight: Variants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      },
    },
  };

  const moveRightToLeft: Variants = {
    initial: { x: "100%" },
    animate: {
      x: "-100%",
      transition: {
        duration: 25,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      },
    },
  };

  return (
    <>
      {/* 라이트 모드 */}
      <div className="absolute inset-0 dark:opacity-0 overflow-hidden">
        {/* 움직이는 기본 그라디언트 배경 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-violet-200 via-pink-200 to-cyan-200 animate-gradient bg-[length:200%_200%]"
        />

        {/* 움직이는 그라디언트 오버레이 */}
        <motion.div
          variants={moveLeftToRight}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(168,85,247,0.2),rgba(59,130,246,0.2),transparent)] blur-2xl"
        />
        <motion.div
          variants={moveRightToLeft}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-[linear-gradient(-45deg,transparent,rgba(236,72,153,0.2),rgba(34,211,238,0.2),transparent)] blur-2xl"
        />

        {/* 움직이는 블롭 */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-fuchsia-400/30 via-violet-400/30 to-indigo-400/30 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/30 via-sky-400/30 to-blue-400/30 rounded-full blur-3xl"
        />

        {/* 추가 장식 요소 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-blue-300/40 to-teal-300/40 rounded-full blur-2xl"
        />
      </div>

      {/* 다크 모드 */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 overflow-hidden">
        {/* 움직이는 기본 그라디언트 배경 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 animate-gradient bg-[length:200%_200%]"
        />

        {/* 움직이는 그라디언트 오버레이 */}
        <motion.div
          variants={moveLeftToRight}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(59,130,246,0.1),rgba(139,92,246,0.1),transparent)] blur-2xl"
        />
        <motion.div
          variants={moveRightToLeft}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-[linear-gradient(-45deg,transparent,rgba(30,64,175,0.1),rgba(76,29,149,0.1),transparent)] blur-2xl"
        />

        {/* 움직이는 블롭 */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-violet-900/30 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-violet-900/30 via-purple-900/30 to-indigo-900/30 rounded-full blur-3xl"
        />

        {/* 추가 장식 요소 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-blue-800/20 to-purple-800/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-purple-800/20 to-indigo-800/20 rounded-full blur-2xl"
        />
      </div>
    </>
  );
};

// tailwind.config.js에 추가할 설정
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         gradient: {
//           '0%, 100%': {
//             'background-position': '0% 50%'
//           },
//           '50%': {
//             'background-position': '100% 50%'
//           },
//         },
//       },
//       animation: {
//         gradient: 'gradient 15s ease infinite',
//       },
//     },
//   },
// }
