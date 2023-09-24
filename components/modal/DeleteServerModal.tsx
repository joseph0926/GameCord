'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/useModalStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { customAxios } from '@/lib/customAxios';
import { useRouter } from 'next/navigation';

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModalStore();

  const router = useRouter();

  const isMoadlOpen = isOpen && type === 'deleteServer';

  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      await customAxios.delete(`/server/${server?.id}`);
      setIsLoading(false);
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isMoadlOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl">Delete Server</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-zinc-500">
          정말로 <span className="to-indigo-500 font-semibold">{server?.name}</span> 서버를 삭제하시겠습니까?
        </DialogDescription>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              닫기
            </Button>
            <Button disabled={isLoading} onClick={deleteHandler} variant="ghost" className="bg-rose-500 text-white">
              삭제
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
