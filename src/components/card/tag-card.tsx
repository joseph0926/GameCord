import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from '@/constants/routes';
import { cn, getGameIconClassName } from '@/lib/utils';
import { Badge } from '../ui/badge';

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
  const iconClass = getGameIconClassName(name);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge
        variant="secondary"
        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase hover:bg-primary/20"
      >
        <div className="inline-flex items-center gap-2">
          <i className={cn(iconClass, 'text-sm')}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <X
            size={12}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="text-sm font-medium text-muted-foreground">{posts}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button
        onClick={handleClick}
        className="inline-flex items-center justify-between gap-2"
      >
        {Content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAGS(_id)}
        className="inline-flex items-center justify-between gap-2"
      >
        {Content}
      </Link>
    );
  }
};
