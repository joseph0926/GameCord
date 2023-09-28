'use client';

import { Fragment, useRef, ElementRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Member, Message, User } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';
import ChatWelcome from './ChatWelcome';
import ChatItem from './ChatItem';
import { pusherClient, toPusherKey } from '@/lib/pusher';

const DATE_FORMAT = 'd MMM yyyy, HH:mm';

type MessageWithMemberWithuser = Message & {
  member: Member & {
    user: User;
  };
};

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  initialMessage: Message[];
  apiUrl: string;
  paramKey: 'channelId' | 'groupMessageId';
  paramValue: string;
  type: 'channel' | 'groupMessage';
}

const ChatMessages = ({ name, member, chatId, apiUrl, paramKey, initialMessage, paramValue, type }: ChatMessagesProps) => {
  const [message, setMessage] = useState<Message[]>(initialMessage);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessage((prevState) => [message, ...prevState]);
    };

    pusherClient.bind('incoming-message', messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind('incoming-message', messageHandler);
    };
  }, []);

  return <div className="flex flex-1 flex-col overflow-y-auto py-4"></div>;
};

export default ChatMessages;
