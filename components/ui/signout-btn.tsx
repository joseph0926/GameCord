'use client';

import { signOut } from 'next-auth/react';
import { Button } from './button';

export const SignoutBtn = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant="outline"
      className="cursor-pointer border-2 border-zinc-700 bg-transparent dark:border-zinc-400"
    >
      로그아웃
    </Button>
  );
};
