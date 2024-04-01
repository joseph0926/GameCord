'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { globeConfig, sampleArcs } from '@/constants/globe-config';
import Link from 'next/link';

const World = dynamic(
  () => import('../../../components/ui/globe').then((m) => m.World),
  {
    ssr: false
  }
);

export function SignHalfBackground({ type }: { type: 'in' | 'up' }) {
  return (
    <div className="relative flex h-screen w-screen flex-row items-center justify-center bg-transparent py-20 md:h-auto lg:w-full">
      <div className="relative mx-auto h-full w-full overflow-hidden px-4 md:h-[40rem] lg:max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          className="div"
        >
          <h2 className="text-center text-xl font-bold text-gray-300 lg:text-2xl xl:text-4xl">
            전세계 게이머들과 연결되어보세요!
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-base font-normal text-neutral-700 dark:text-neutral-200 md:text-lg">
            {type === 'in' ? (
              <span className="flex w-full items-center justify-center gap-2 text-sm text-gray-700">
                아직 회원이 아니신가요?
                <Link
                  href="/sign?type=up"
                  className="text-[1rem] font-bold text-gray-800"
                >
                  회원가입으로 이동하기
                </Link>
              </span>
            ) : (
              <span className="flex w-full items-center justify-center gap-2 text-sm text-gray-700">
                이미 회원이신가요?
                <Link
                  href="/sign?type=in"
                  className="text-[1rem] font-bold text-gray-800"
                >
                  로그인으로 이동하기
                </Link>
              </span>
            )}
          </p>
        </motion.div>
        <div className="absolute z-10 h-72 w-full md:h-full">
          <World data={sampleArcs} globeConfig={globeConfig} />;
        </div>
      </div>
    </div>
  );
}
