import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import '../styles/prism.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/providers/ModalProvider';
import ToastProvider from '@/providers/ToastProvider';
import CustomReactQueryProvider from '@/providers/CustomReactQueryProvider';

const font = Ubuntu({ subsets: ['cyrillic'], weight: '400' });

export const metadata: Metadata = {
  title: 'GameCord',
  description: 'GameCord에서 게임에 대한 평가와 리뷰를 남기고, 자유롭게 소통해보세요. 또한 모더들을 위한 커뮤니티까지 준비되어있습니다'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ko" suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="game-cord-theme">
            <ToastProvider />
            <ModalProvider />
            <CustomReactQueryProvider>{children}</CustomReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
