'use client';

import { navLinks } from '@/lib/contants';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Separator } from '../ui/separator';

export default function Sidebar() {
  return (
    <div className="bg-gradient relative h-screen w-24 py-2 pl-1 pr-2 max-sm:hidden md:w-52 md:py-4 md:pl-2 md:pr-4 lg:w-60 lg:py-6 lg:pl-3 lg:pr-6">
      <Link
        href="/dashboard"
        className="relative flex w-full items-center justify-center py-4"
      >
        <h1 className="gradient-text hidden md:block">My Note</h1>
      </Link>
      <Separator className="bg-gradient-to-r from-transparent via-[#E0E1E2] to-transparent" />
      <div className="mt-10 flex flex-col gap-6">
        {navLinks.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="hover:back flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 font-semibold transition-colors duration-200 max-md:justify-center"
          >
            <item.icon />
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 w-full">
        <ThemeToggle classNames="bg2 w-[90%]" />
      </div>
    </div>
  );
}
