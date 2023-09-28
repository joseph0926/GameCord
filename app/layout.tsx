import './globals.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import { ModalProvider } from '@/providers/modal-provider';
import CustomReactQueryProvider from '@/providers/custom-react-query-provider';
import { ToasterProvider } from '@/providers/toaster-provider';

const font = Ubuntu({ subsets: ['cyrillic'], weight: '400' });

export const metadata: Metadata = {
  title: 'TripCord',
  description: 'TripCord: 친구들과의 여행 일정 계획부터 대화까지, 모든 것을 한 곳에서...'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(font.className, 'overflow-x-hidden bg-white dark:bg-[#313338]')}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="tripcord-theme">
          <ModalProvider />
          <CustomReactQueryProvider>
            <ToasterProvider />
            {children}
          </CustomReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
