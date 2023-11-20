'use client';

import { Search } from 'lucide-react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useState } from 'react';

type ServerSearchProps = {
  data: {
    label: string;
    type: 'channel' | 'member';
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
};

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition-all hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
      >
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition-all group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Search
        </p>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="search all channel and members" />
        <CommandList>
          <CommandEmpty>Empty,,,</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data || !data.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, icon, name }) => {
                  return (
                    <CommandItem key={id}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
