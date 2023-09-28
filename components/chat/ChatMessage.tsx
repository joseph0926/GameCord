'use client';

import { Fragment, useRef, ElementRef } from 'react';
import { format } from 'date-fns';
import { Member, Message, User } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';
import ChatWelcome from './ChatWelcome';
import ChatItem from './ChatItem';

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
  apiUrl: string;
  paramKey: 'channelId' | 'groupMessageId';
  paramValue: string;
  type: 'channel' | 'groupMessage';
}

const ChatMessages = ({ name, member, chatId, apiUrl, paramKey, paramValue, type }: ChatMessagesProps) => {
  return <div className="flex flex-1 flex-col overflow-y-auto py-4"></div>;
};

export default ChatMessages;
