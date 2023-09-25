import { fetchGroupMessage } from '@/lib/actions/chat/fetchActions';
import { createGroupMessage } from '@/lib/actions/chat/mutateActions';

export const fetchORCreateGroupMessages = async (memberOneId: string, memberTwoId: string) => {
  let groupMessage = (await fetchGroupMessage(memberOneId, memberTwoId)) || (await fetchGroupMessage(memberTwoId, memberOneId));

  if (!groupMessage) {
    groupMessage = await createGroupMessage(memberOneId, memberTwoId);
  }

  return groupMessage;
};
