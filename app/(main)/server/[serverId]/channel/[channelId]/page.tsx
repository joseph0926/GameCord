import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { getCurrentUser } from '@/lib/actions/user/fetchActions';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const ChannelPage = async ({ params }: { params: { serverId: string; channelId: string } }) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/');
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId
    }
  });
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: user.id
    }
  });
  if (!channel || !member) {
    return redirect('/');
  }

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader name={channel.name} serverId={params.serverId} type="channel" />
      <ChatMessage
        member={member}
        name={channel.name}
        type="channel"
        apiUrl="/api/messages"
        paramKey="channelId"
        paramValue={channel.id}
        chatId={channel.id}
      />
      <ChatInput
        apiUrl=""
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
