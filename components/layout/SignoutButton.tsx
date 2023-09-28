'use client';
import { UserMinus } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const SignoutButton = () => {
  return <UserMinus onClick={() => signOut()} className="cursor-pointer" />;
};
