import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import { CustomProviders } from '@/lib/custom-providers';
import { cn } from '@/lib/utils';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import { Toaster } from 'sonner';
import { EdgeStoreProvider } from '@/hooks/useEdgeStore';

const ubuntu = Ubuntu({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'MyNote',
  description: '본인의 일정 관리를 쉽게 만드는 웹 애플리케이션',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="ko">
        <body
          className={cn(
            ubuntu.className,
            "text h-screen w-screen bg-[url('/bg.png')]",
          )}
        >
          <EdgeStoreProvider>
            <CustomProviders>
              <Toaster position="bottom-center" />
              {children}
            </CustomProviders>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
