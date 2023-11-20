'use client';

import { ModalType, useModal } from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Hash, Mic } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const { onOpen } = useModal();

  const router = useRouter();
  const params = useParams();

  const Icon = iconMap[channel.type];

  const channelClickHandler = () => {
    router.push(`/server/${params?.serverId}/channel/${channel.id}`);
  };

  const actionHandler = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={channelClickHandler}
      className={cn(
        'group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition-all hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50'
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          'line-clamp-1 text-sm font-semibold text-zinc-500 transition-all group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params?.channelId === channel.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {channel.name}
      </p>
    </button>
  );
};

export default ServerChannel;
