'use client';

import Image from 'next/image';
import React from 'react';
import { Input } from '../ui/input';

type LocalSearchbarProps = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClassName?: string;
};

const LocalSearchbar = ({ route, iconPosition, imgSrc, placeholder, otherClassName }: LocalSearchbarProps) => {
  return (
    <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClassName}`}>
      {iconPosition === 'left' && <Image src={imgSrc} alt="search" width={24} height={24} className="cursor-pointer" />}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === 'right' && <Image src={imgSrc} alt="search" width={24} height={24} className="cursor-pointer" />}
    </div>
  );
};

export default LocalSearchbar;
