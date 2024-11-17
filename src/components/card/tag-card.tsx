import Link from 'next/link';
import React from 'react';
import { cn, getDeviconClassName } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { ROUTES } from '@/constants/routes';
import { X } from 'lucide-react'; // Lucide 아이콘 추가

interface Props {
  _id: string;
  name: string;
  posts?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

export const TagCard = ({
  _id,
  name,
  posts,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const iconClass = getDeviconClassName(name);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="flex flex-row gap-2 rounded-md border-none bg-gray-100 px-4 py-2 text-xs font-medium uppercase text-gray-600 dark:bg-gray-700 dark:text-gray-300">
        <div className="flex items-center justify-center space-x-2">
          <i className={cn(iconClass, 'text-sm')}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <X
            size={12}
            className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {posts}
        </p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }
};
