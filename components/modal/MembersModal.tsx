'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/useModalStore';
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { useOrigin } from '@/hooks/useOrigin';
import { useState } from 'react';
import { customAxios } from '@/lib/customAxios';
import { ServerWithMembersWithUser } from '@/global';
import { ScrollArea } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/ui/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MemberRole } from '@prisma/client';
import qs from 'query-string';
import { useRouter } from 'next/navigation';

const MembersModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModalStore();
  const router = useRouter();

  const [loadingId, setLoadingId] = useState('');

  const isMoadlOpen = isOpen && type === 'members';
  const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />
  };

  const { server } = data as { server: ServerWithMembersWithUser };

  const roleChangeHandler = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/member/${memberId}`,
        query: {
          serverId: server?.id,
          memberId
        }
      });

      const response = await customAxios.patch(url, { role });

      router.refresh();
      onOpen('members', { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId('');
    }
  };

  return (
    <Dialog open={isMoadlOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl">Manage Members</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">{server?.members?.length} 명</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] px-6">
          {server?.members?.map((mem) => (
            <div key={mem.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={mem?.user.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-1 text-xs font-semibold">
                  {mem?.user.name}
                  {roleIconMap[mem.role]}
                </div>
                <p className="text-xs text-zinc-500">{mem?.user.email}</p>
              </div>
              {server.userId !== mem?.userId && (
                <div className="ml-auto">
                  <DropdownMenu>
                    {loadingId !== mem?.id && (
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                    )}
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center pl-2">
                          <ShieldQuestion className="mr-2 h-4 w-4" />
                          <span>역할</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => roleChangeHandler(mem?.id, MemberRole.GUEST)}>
                              <Shield className="mr-2 h-4 w-4" />
                              게스트
                              {mem?.role === MemberRole.GUEST && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => roleChangeHandler(mem?.id, MemberRole.MODERATOR)}>
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              관리자
                              {mem?.role === MemberRole.MODERATOR && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Gavel className="mr-2 h-4 w-4" />벤
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === mem?.id && <Loader2 className="ml-auto h-4 w-4 animate-spin text-zinc-500" />}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
