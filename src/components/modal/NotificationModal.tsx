'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';

export const NotificationModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  const isModalOpen = isOpen && type === 'notification' && localStorage.getItem('noti') === 'open';

  const nomoreShowHandler = () => {
    localStorage.setItem('noti', 'close');
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
    localStorage.getItem('noti') !== 'close' && localStorage.setItem('noti', 'open');
    onOpen('notification');
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="z-50 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">공지</DialogTitle>
          <DialogDescription>
            해당 웹 애플리케이션의 기능을 테스트 해보시려면
            <br /> 아래의 이메일을 활용해주세요!
          </DialogDescription>
        </DialogHeader>
        <Separator className="h-0.5 w-full bg-white" />
        <div className="flex flex-col gap-6">
          <div>
            <span>이메일: </span>
            <span>santiago.stokes@ethereal.email</span>
          </div>
          <div>
            <span>비밀번호: </span>
            <span>Py5uqNY4TkfFrKQbyc</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={nomoreShowHandler}>다시 보지 않기</Button>
          <Button onClick={onClose}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
