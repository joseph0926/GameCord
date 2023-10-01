'use client';

import { useModalStore } from '@/hooks/useModalStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Image from 'next/image';

const ServerIntroModal = () => {
  const { isOpen, type, onClose } = useModalStore();

  const isMoadlOpen = isOpen && type === 'serverintro';

  return (
    <Dialog open={isMoadlOpen} onOpenChange={onClose}>
      <DialogContent className="top-[70%] h-full max-h-[170%] max-w-full overflow-y-scroll sm:rounded-3xl">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="flex flex-col justify-start gap-6">
            <div>joseph0926</div>
            <div className="flex items-center gap-2">
              <span>server name</span> / <span>테마</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Image src="/images/skyrim.png" alt="server-intro" width={100} height={100} className="h-[30%] w-full" />
          {/* 이미지 슬라이드 */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerIntroModal;
