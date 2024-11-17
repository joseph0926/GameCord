'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

interface LocalSearchProps {
  route: string;
  placeholder: string;
  otherClasses?: string;
  onSearch: (query: string) => void;
}

export function LocalSearch({
  route,
  placeholder,
  otherClasses,
  onSearch,
}: LocalSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || ''
  );
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      let newUrl = '';
      if (searchQuery.trim()) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery.trim(),
        });
      } else if (pathname === route) {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }

      if (newUrl) {
        router.push(newUrl, { scroll: false });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery); // 실시간 검색을 위한 콜백
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');

    if (pathname === route) {
      startTransition(() => {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
        router.push(newUrl, { scroll: false });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={cn(
          'group relative flex min-h-[56px] grow items-center gap-4 rounded-lg bg-gray-100 px-4 transition-all duration-200 dark:bg-gray-800',
          otherClasses,
          isFocused && 'ring-1 ring-blue-500 dark:ring-blue-400',
          isPending && 'brightness-95'
        )}
      >
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className={cn(
            'h-9 w-9 p-0',
            isFocused && 'text-blue-500 dark:text-blue-400',
            isPending && 'animate-pulse'
          )}
        >
          <Search className="h-4 w-4" />
        </Button>

        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'border-none bg-transparent text-base text-gray-700 shadow-none outline-none placeholder:text-gray-500 focus:ring-0 dark:text-gray-200 dark:placeholder:text-gray-400',
            'transition-all duration-200'
          )}
        />

        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-4 h-8 w-8 rounded-full p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {isPending && (
          <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden">
            <div className="animate-shimmer h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
          </div>
        )}
      </div>
    </form>
  );
}
