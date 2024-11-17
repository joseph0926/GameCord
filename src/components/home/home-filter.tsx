'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { filters } from '@/constants/home';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

interface HomeFilterProps {
  onFilter: (filter: string) => void;
}

export function HomeFilter({ onFilter }: HomeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || '';

  const [active, setActive] = useState(currentFilter);
  const [isPending, startTransition] = useTransition();

  const handleFilterClick = (filter: string) => {
    // 즉시 UI 업데이트 및 필터링
    const newFilter = filter === active ? '' : filter;
    setActive(newFilter);
    onFilter(newFilter);

    // URL 업데이트는 트랜지션으로 처리
    startTransition(() => {
      let newUrl = '';
      if (newFilter) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'filter',
          value: newFilter.toLowerCase(),
        });
      } else {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['filter'],
        });
      }

      if (newUrl) {
        router.push(newUrl, { scroll: false });
      }
    });
  };

  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = active === filter.value;

        return (
          <Button
            key={filter.value}
            onClick={() => handleFilterClick(filter.value)}
            disabled={isPending}
            variant="ghost"
            className={cn(
              'h-10 rounded-lg px-6 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700',
              isPending && 'pointer-events-none opacity-70'
            )}
          >
            <span
              className={cn(
                'relative',
                isActive &&
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current'
              )}
            >
              {filter.name}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
