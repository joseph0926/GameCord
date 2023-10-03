'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { DialogClose } from '@radix-ui/react-dialog';

const MyServerListModal = () => {
  const { onClose, isOpen, type, data } = useModal();

  const isMoadlOpen = isOpen && type === 'serverList';

  return (
    <Dialog open={isMoadlOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl">My ServerList</DialogTitle>
          <DialogClose className="m-0 p-0">
            <ScrollArea className="h-[90%] py-4">
              {data.myServers?.map((server) => (
                <Link onClick={onClose} href={`/server/${server.id}`} key={server.id} className="mb-4 flex items-center gap-4 py-2">
                  <div className="group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]">
                    <Image src={server.imageUrl} width={48} height={48} className="h-full w-full" alt="server" />
                  </div>
                  <div>{server.name}</div>
                </Link>
              ))}
            </ScrollArea>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MyServerListModal;
