'use client';

import { ServerWithMembersWithUser } from '@/global';
import { MemberRole } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';
import { useModalStore } from '@/hooks/useModalStore';

type ServerHeaderProps = {
  server: ServerWithMembersWithUser;
  role?: MemberRole;
};

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModalStore();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 font-semibold transition-all hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', { server })}
            className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
          >
            초대하기
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={() => onOpen('editServer', { server })} className="cursor-pointer px-3 py-2 text-sm">
            서버 설정
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={() => onOpen('members', { server })} className="cursor-pointer px-3 py-2 text-sm">
            멤버 관리
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem onClick={() => onOpen('createChannel')} className="cursor-pointer px-3 py-2 text-sm">
            채널 생성
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem onClick={() => onOpen('deleteServer', { server })} className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            서버 삭제
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem onClick={() => onOpen('leaveServer', { server })} className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            서버 나가기
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
