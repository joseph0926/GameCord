'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { filters } from '@/constants/home';

export const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get('filter');
  const [active, setActive] = useState(filterParams || '');

  const handleTypeClick = (filter: string) => {
    let newUrl = '';

    if (filter === active) {
      setActive('');

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['filter'],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          className={cn(
            `text-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-700'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800'
          )}
          variant="ghost"
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};
