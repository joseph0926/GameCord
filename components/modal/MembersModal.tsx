'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModal';
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import UserAvatar from '../ui/user-avatar';
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
} from '../ui/dropdown-menu';
import { Member, MemberRole } from '@prisma/client';
import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { ServerWithMembersWithProfiles } from '@/@types/custom';

const MembersModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const router = useRouter();

  const [loadingId, setLoadingId] = useState('');

  const isMoadlOpen = isOpen && type === 'members';
  const roleIconMap = {
    GUEST: null,
    MANAGER: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />
  };

  const { server } = data as unknown as { server: ServerWithMembersWithProfiles };

  const roleChangeHandler = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/member/${memberId}`,
        query: {
          serverId: server?.id,
          memberId
        }
      });

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ role })
      });

      const serverData = await response.json();

      router.refresh();
      onOpen('members', { server: serverData });
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
          <DialogDescription className="text-center text-zinc-500">{server?.members?.length} Members</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] px-6">
          {server?.members?.map((mem) => (
            <div key={mem.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={mem?.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-1 text-xs font-semibold">
                  {mem?.profile.name}
                  {roleIconMap[mem.role]}
                </div>
                <p className="text-xs text-zinc-500">{mem?.profile.email}</p>
              </div>
              {server.profileId !== mem?.profileId && (
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
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => roleChangeHandler(mem?.id, MemberRole.GUEST)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Guest
                              {mem?.role === MemberRole.GUEST && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => roleChangeHandler(mem?.id, MemberRole.MANAGER)}>
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Manager
                              {mem?.role === MemberRole.MANAGER && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Gavel className="mr-2 h-4 w-4" />
                        Kick
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
