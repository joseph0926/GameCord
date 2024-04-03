'use client';

import { BarChart, TrendingUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';

export default function MainNavbarTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Tabs
      defaultValue={type || 'best'}
      onValueChange={(e) => {
        router.push(pathname + '?' + createQueryString('type', e));
      }}
    >
      <TabsList className="flex h-full w-full items-center justify-start gap-2.5 bg-transparent">
        <TabsTrigger
          value="real"
          className={cn(
            'flex items-center gap-2 text-[0.875rem] text-gray-400',
            type === 'real'
              ? 'border-b-2 border-solid border-blue-400 !bg-transparent !text-gray-100'
              : 'text-gray-400'
          )}
        >
          <TrendingUp className="h-5 w-5 text-blue-300" />
          <span>실시간</span>
        </TabsTrigger>
        <TabsTrigger
          value="best"
          className={cn(
            'flex items-center gap-2 text-[0.875rem] text-gray-400',
            type === 'best'
              ? 'border-b-2 border-solid border-blue-400 !bg-transparent !text-gray-100'
              : 'text-gray-400'
          )}
        >
          <BarChart className="h-5 w-5 text-blue-300" />
          <span>인기글</span>
        </TabsTrigger>
        <TabsTrigger
          value="notice"
          className={cn(
            'flex items-center gap-2 text-[0.875rem] text-gray-400',
            type === 'notice'
              ? 'border-b-2 border-solid border-blue-400 !bg-transparent !text-gray-100'
              : 'text-gray-400'
          )}
        >
          <span>공지글</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
