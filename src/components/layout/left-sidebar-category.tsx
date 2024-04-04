'use client';

import { cn } from '@/lib/utils';
import { Home, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sideCategory = [
  { href: '/', label: 'Home', icon: <Home /> },
  { href: '/server', label: 'Server', icon: <MessageCircle /> }
];

export default function LeftSidebarCategory() {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-4 border-b border-solid border-gray-600 pb-4">
      {sideCategory.map((category) => (
        <Link
          href={category.href}
          key={category.href}
          className={cn(
            'flex items-center gap-4 py-2 transition-transform duration-200 hover:translate-x-4',
            pathname === category.href ? 'text-blue-400' : 'text-gray-100'
          )}
        >
          {category.icon}
          <span>{category.label}</span>
        </Link>
      ))}
    </div>
  );
}
