import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { techMap } from '@/constants/tech';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : 'devicon-devicon-plain';
};

export const getTimeStamp = (date: Date) => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

export const createUniqueUsername = (username: string): string => {
  const base = username
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '_')
    .toLowerCase()
    .trim();

  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${base}_${randomSuffix}`;
};
