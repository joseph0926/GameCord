'use client';

import { Member, Message, Profile } from '@prisma/client';
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '@/hooks/useChatQuery';
import { Loader2, ServerCrash } from 'lucide-react';
import { Fragment } from 'react';

type ChatMessageProps = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  type: 'channel' | 'conversation';
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const ChatMessage = ({ name, member, chatId, apiUrl, socketQuery, socketUrl, paramKey, paramValue, type }: ChatMessageProps) => {
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
  });
  if (status === 'loading') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading message,,,</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="h-7 w-7 text-zinc-500" />
        <p className="text-xs text-rose-500">Error,,,</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="mt-auto flex  flex-col-reverse">
        {data?.pages?.map((group, idx) => (
          <Fragment key={idx}>
            {group.items.map((message: MessageWithMemberWithProfile) => {
              <div key={message.id}>{message.content}</div>;
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;
