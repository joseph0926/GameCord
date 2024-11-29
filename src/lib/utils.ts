import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { gameIconMap } from '@/constants/game-icon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGameIconClassName = (gameName: string) => {
  const normalizedName = gameName.toLowerCase().trim();

  if (gameIconMap[normalizedName]) {
    return gameIconMap[normalizedName];
  }

  const partialMatch = Object.keys(gameIconMap).find((key) =>
    normalizedName.includes(key)
  );

  return partialMatch ? gameIconMap[partialMatch] : 'fa-solid fa-gamepad';
};

export const getTimeStamp = (date: Date) => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: '년', seconds: 31536000 },
    { label: '개월', seconds: 2592000 },
    { label: '주', seconds: 604800 },
    { label: '일', seconds: 86400 },
    { label: '시간', seconds: 3600 },
    { label: '분', seconds: 60 },
    { label: '초', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.label} 전`;
    }
  }
  return '방금 전';
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
