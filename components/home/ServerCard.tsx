'use client';

import { useModalStore } from '@/hooks/useModalStore';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const ServerCard = () => {
  const { onOpen } = useModalStore();

  return (
    <div onClick={() => onOpen('serverintro')} className="flex flex-col items-center justify-center rounded-2xl drop-shadow-md">
      <div className="group relative flex h-[180px] w-[200px] cursor-pointer items-center justify-center overflow-y-hidden">
        <Image src="/images/skyrim.png" alt="server" width={214} height={154} className="h-full w-full rounded-2xl object-cover" />
        <div className="absolute bottom-[-70px] left-0 z-20 h-[70px] w-full rounded-2xl rounded-b bg-gradient-to-t from-black to-transparent transition group-hover:translate-y-[-70px]">
          asdasd
        </div>
        <div className="absolute bottom-[-100%] h-full w-full rounded-2xl bg-white/10 transition group-hover:visible group-hover:translate-y-[-100%]" />
      </div>
      <div className="flex w-full items-center justify-between text-sm">
        <p>joseph0926</p>
        <p className="flex items-center gap-1">
          <Heart className="h-4 w-4" /> <span>525</span>
        </p>
      </div>
    </div>
  );
};

export default ServerCard;
