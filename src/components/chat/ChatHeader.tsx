import { Hash } from 'lucide-react';
import MobileToggle from '@/components/ui/mobile-toggle';
import UserAvatar from '@/components/ui/user-avatar';

type ChatHeaderProps = {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
};

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />}
      {type === 'conversation' && <UserAvatar src={imageUrl} className="mr-2 h-8 w-8 md:h-10 md:w-10" />}
      <p className="text-lg font-semibold">{name}</p>
      <div className="ml-auto flex items-center"></div>
    </div>
  );
};

export default ChatHeader;
