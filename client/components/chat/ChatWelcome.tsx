import { Hash } from 'lucide-react';
import React from 'react';

type ChatWelcomeProps = {
  name: string;
  type: 'channel' | 'groupMessage';
};

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="mb-4 space-y-2 px-4">
      <p className="text-xl font-bold md:text-3xl">
        {type === 'channel' ? '채널 # ' : ''}
        {name}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {type === 'groupMessage' ? `#${name} 채널에 메시지를 남겨보세요!` : `${name}님에게 메시지를 남겨보세요!`}
      </p>
    </div>
  );
};

export default ChatWelcome;
