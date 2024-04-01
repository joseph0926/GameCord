'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SocialLogin } from '@/app/(auth)/components/social-login';
import SigninForm from '@/app/(auth)/components/signin-form';
import SignupForm from '@/app/(auth)/components/signup-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignHalfBackground } from '../components/sign-half-background';
import { useEffect } from 'react';

export default function SignPage() {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type') as 'in' | 'up';

  const router = useRouter();

  const slideDirection = type === 'up' ? 100 : -100;

  useEffect(() => {
    if (!type) {
      router.push('/sign?type=in');
    }
  }, [type]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          className="flex h-[70%] w-full flex-col items-center justify-center md:h-full md:flex-1"
          key={type === 'up' ? 'signup' : 'signin'}
          initial={{ x: slideDirection, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -slideDirection, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded p-10 shadow">
            <p
              tabIndex={0}
              role="heading"
              aria-label={
                type === 'up'
                  ? 'Register your account'
                  : 'Login to your account'
              }
              className="w-full text-2xl font-extrabold leading-6 text-white"
            >
              {type === 'up' ? 'Register to' : 'Login to'}{' '}
              <span className="text-green-300">GameCord</span>
            </p>
            <SocialLogin />
            <div className="flex w-full items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <p className="px-2.5 text-base font-medium leading-4 text-gray-300">
                OR
              </p>
              <hr className="w-full bg-gray-400" />
            </div>
            {type === 'up' ? <SignupForm /> : <SigninForm />}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="max-md:max-h-[40vh] max-md:overflow-y-hidden md:flex-1">
        <SignHalfBackground type={type} />
      </div>
    </>
  );
}
