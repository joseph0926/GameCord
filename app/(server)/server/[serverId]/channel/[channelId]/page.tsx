import { getCurrentUser } from '@/actions/user';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const ChannelPage = async ({ params }: { params: { serverId: string; channelId: string } }) => {
  const profile = await getCurrentUser();
  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId
    }
  });
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    }
  });
  if (!channel || !member) {
    return redirect('/');
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader name={channel.name} serverId={params.serverId} type="channel" />
      <div className="flex-1">Future Messages</div>
      <ChatMessage
        member={member}
        name={channel.name}
        type="channel"
        apiUrl="/api/message"
        socketUrl="/socket/message"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId
        }}
        paramKey="channelId"
        paramValue={channel.id}
        chatId={channel.id}
      />
      <ChatInput
        apiUrl="/socket/messages"
        name={channel.name}
        type="channel"
        query={{
          channelId: channel.id,
          serverId: channel.serverId
        }}
      />
    </div>
  );
};

export default ChannelPage;
