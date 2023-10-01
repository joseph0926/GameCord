import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { fetchORCreateGroupMessages } from '@/lib/actions/chat/fetchORmutateGroupMessages';
import { getCurrentUser } from '@/lib/actions/user';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const MemberPage = async ({ params }: { params: { memberId: string; serverId: string } }) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/');
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: user.id
    },
    include: {
      user: true
    }
  });
  if (!currentMember) {
    return redirect('/');
  }

  const groupMessage = await fetchORCreateGroupMessages(currentMember.id, params.memberId);
  if (!groupMessage) {
    return redirect(`/server/${params.serverId}`);
  }

  const { memberOne, memberTwo } = groupMessage;

  const otherMember = memberOne.userId === user.id ? memberTwo : memberOne;

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader imageUrl={otherMember.user.imageUrl!} name={otherMember.user.name} serverId={params.serverId} type="groupMessage" />
      <ChatMessage
        member={currentMember}
        name={otherMember.user.name}
        chatId={groupMessage.id}
        type="groupMessage"
        apiUrl="/api/direct-messages"
        paramKey="groupMessageId"
        paramValue={groupMessage.id}
      />
      <ChatInput
        name={otherMember.user.name}
        type="groupMessage"
        apiUrl=""
        query={{
          groupMessageId: groupMessage.id
        }}
      />
    </div>
  );
};

export default MemberPage;
