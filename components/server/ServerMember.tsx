'use client';

import { Member, User, Server } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { roleIconMap } from '../layout/SignleServerSidebar';
import { cn } from '@/lib/utils';
import UserAvatar from '../ui/user-avatar';

type ServerMemberProps = {
  member: Member & { user: User };
  server: Server;
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();

  const icon = roleIconMap[member.role];

  const memberClickHandler = () => {
    router.push(`/server/${params?.serverId}/conversation/${member.id}`);
  };

  return (
    <button
      onClick={memberClickHandler}
      className={cn(
        'group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition-all hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params?.memberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <UserAvatar src={member.user.imageUrl} className="h-8 w-8 md:h-10 md:w-10" />
      <p
        className={cn(
          'text-sm font-semibold text-zinc-500 transition-all group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params?.memberId === member.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {member.user.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
