import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'GmaeCord',
  description:
    'GameCord는 Reddit의 커뮤니티 중심 콘텐츠 구조와 Discord의 실시간 소통 기능을 결합한 새로운 형태의 게임 커뮤니티 플랫폼입니다. 게이머들이 좋아하는 게임에 대해 깊이 있는 토론을 나누고, 실시간으로 소통하며, 게임 관련 콘텐츠를 공유할 수 있는 통합 환경을 제공합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(pretendard.className, 'antialiased')}>
        {children}
      </body>
    </html>
  );
}
