import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 bg-cover bg-center bg-no-repeat px-4 py-10 dark:from-blue-950 dark:via-slate-900 dark:to-slate-900">
      <div className="bg-grid-slate-200 dark:bg-grid-slate-800 absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <AuthWrapper>{children}</AuthWrapper>
    </main>
  );
}
