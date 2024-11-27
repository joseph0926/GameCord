'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItemType = {
  icon: LucideIcon;
  label: string;
  href: string;
};

type NavItemProps = {
  item: NavItemType;
  isCollapsed: boolean;
};

export const NavItem = ({ item, isCollapsed }: NavItemProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === item.href ||
    (item.href !== '/' && pathname.startsWith(item.href));

  return (
    <Link href={item.href} className="w-full">
      <motion.div
        className={cn(
          'group relative flex items-center gap-4 rounded-lg px-3 py-2 transition-colors',
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <item.icon
          className={cn(
            'h-5 w-5',
            isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
          )}
        />
        {!isCollapsed && (
          <span
            className={cn(
              'font-medium',
              isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'
            )}
          >
            {item.label}
          </span>
        )}
        {!isCollapsed && isActive && (
          <motion.div
            className="absolute right-2 h-2 w-2 rounded-full bg-white"
            layoutId="activeIndicator"
          />
        )}
      </motion.div>
    </Link>
  );
};
