'use client';

import { logout } from '@/actions/auth';

export function LogoutButton({ children }: { children: React.ReactNode }) {
  const logoutHandler = () => {
    logout();
  };

  return (
    <span onClick={logoutHandler} className="cursor-pointer">
      {children}
    </span>
  );
}
