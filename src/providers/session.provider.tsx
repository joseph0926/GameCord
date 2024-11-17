import { auth } from '@/auth';
import { SessionProvider as AuthProvider } from 'next-auth/react';

export async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
