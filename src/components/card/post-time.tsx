'use client';

import { useEffect, useState } from 'react';
import { getTimeStamp } from '@/lib/utils';

export const PostTime = ({ date }: { date: Date }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    setTimeAgo(getTimeStamp(date));
  }, [date]);

  return <span>{timeAgo}</span>;
};
