import { SessionProvider as AuthProvider } from 'next-auth/react';
import { auth } from '@/auth';

export async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
