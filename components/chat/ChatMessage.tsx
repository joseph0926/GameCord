'use client';

import { Fragment, useRef, ElementRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Member, Message, Profile } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';

import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatScroll } from '@/hooks/use-chat-scroll';

import ChatWelcome from '@/components/chat/ChatWelcome';
import ChatItem from '@/components/chat/ChatItem';
import { useQueryClient } from '@tanstack/react-query';
import { pusherClient, toPusherKey } from '@/lib/pusher';

const DATE_FORMAT = 'd MMM yyyy, HH:mm';

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  type: 'channel' | 'conversation';
}

export const ChatMessages = ({ name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
  });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0
  });

  const queryClient = useQueryClient();
  console.log(data);

  useEffect(() => {
    const channel = pusherClient.subscribe(toPusherKey(`chat:${socketQuery.channelId}`));
    console.log(channel);

    channel.bind('new-message', (newMessage: Message) => {
      queryClient.setQueryData([queryKey], (old: any) => {
        old.pages[0].items.unshift(newMessage);
        return old;
      });
      queryClient.invalidateQueries([queryKey]);
    });

    return () => {
      channel.unbind('new-message');
      pusherClient.unsubscribe(toPusherKey(`chat:${socketQuery.channelId}`));
    };
  }, [chatId, queryClient, socketQuery.channelId]);

  if (status === 'loading') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading messages...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Something went wrong!</p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex flex-1 flex-col overflow-y-auto py-4">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="my-4 h-6 w-6 animate-spin text-zinc-500" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="my-4 text-xs text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
