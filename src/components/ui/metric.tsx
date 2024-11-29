import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

interface MetricProps {
  Icon: string | LucideIcon;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  isAuthor?: boolean;
  iconStyles?: string;
  titleComponent?: JSX.Element;
}

export const Metric = ({
  Icon,
  alt,
  value,
  title,
  href,
  textStyles,
  iconStyles,
  isAuthor,
  titleComponent,
}: MetricProps) => {
  const metricContent = (
    <div className="flex items-center gap-1">
      {typeof Icon === 'string' ? (
        <Image
          src={Icon}
          width={16}
          height={16}
          alt={alt}
          className={cn('rounded-full object-contain', iconStyles)}
        />
      ) : (
        <Icon
          size={16}
          className={cn('text-gray-500 dark:text-gray-400', iconStyles)}
        />
      )}
      <p className={cn(textStyles, 'flex items-center gap-1')}>
        <span
          className={cn(
            'line-clamp-1 text-sm font-normal',
            isAuthor ? 'max-sm:hidden' : ''
          )}
        >
          {title}
          {titleComponent}
        </span>
        {value}
      </p>
    </div>
  );

  return href ? (
    <Link href={href} className="flex items-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex items-center gap-1">{metricContent}</div>
  );
};
