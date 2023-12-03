'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { search } from '@/actions/search';

const GlobalSearch = () => {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(searchParams?.get('term') || '');
  }, [searchParams]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <form action={search} className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image src="/images/search.svg" alt="search" width={24} height={24} className="cursor-pointer" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          name="term"
          className="paragraph-regular no-focus placeholder border-none !bg-transparent shadow-none outline-none"
        />
      </form>
    </div>
  );
};

export default GlobalSearch;
