import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Ubuntu({ subsets: ['cyrillic'], weight: '400' });

export const metadata: Metadata = {
  title: 'TripCord',
  description: 'TripCord: 친구들과의 여행 일정 계획부터 대화까지, 모든 것을 한 곳에서...'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <body className={cn(font.className, 'overflow-x-hidden')}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
