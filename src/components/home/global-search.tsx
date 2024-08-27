'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function GlobalSearch() {
  return (
    <div className="relative flex w-[32.5rem] items-center gap-4 rounded-2xl bg-background px-5 py-4">
      <Search className="size-5" />
      <Input
        className="w-full border-none bg-transparent text-xl"
        placeholder="Search"
      />
    </div>
  );
}
