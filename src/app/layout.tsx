import './globals.css';
import '../styles/prism.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { cn } from '@/lib/utils';
import CustomProviders from '@/lib/custom-providers';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const font = Ubuntu({ subsets: ['cyrillic'], weight: '400' });

export const metadata: Metadata = {
  title: 'GameCord',
  description:
    'GameCord에서 게임에 대한 평가와 리뷰를 남기고, 자유롭게 소통해보세요. 또한 모더들을 위한 커뮤니티까지 준비되어있습니다'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
        <SessionProvider session={session}>
          <CustomProviders>{children}</CustomProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
