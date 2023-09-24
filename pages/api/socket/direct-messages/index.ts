import { NextApiRequest } from 'next';

import { NextApiResponseServerIO } from '@/global';
import db from '@/lib/db';
import { getCurrentUserAsPage } from '@/lib/actions/user/fetchActions';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getCurrentUserAsPage(req);
    const { content, fileUrl } = req.body;
    const { groupMessageId } = req.query;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!groupMessageId) {
      return res.status(400).json({ error: 'groupMessage ID missing' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content missing' });
    }

    const groupMessage = await db.groupMessage.findFirst({
      where: {
        id: groupMessageId as string,
        OR: [
          {
            memberOne: {
              userId: user.id
            }
          },
          {
            memberTwo: {
              userId: user.id
            }
          }
        ]
      },
      include: {
        memberOne: {
          include: {
            user: true
          }
        },
        memberTwo: {
          include: {
            user: true
          }
        }
      }
    });

    if (!groupMessage) {
      return res.status(404).json({ message: 'groupMessage not found' });
    }

    const member = groupMessage.memberOne.userId === user.id ? groupMessage.memberOne : groupMessage.memberTwo;

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        groupMessageId: groupMessageId as string,
        memberId: member.id
      },
      include: {
        member: {
          include: {
            user: true
          }
        }
      }
    });

    const channelKey = `chat:${groupMessageId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log('[DIRECT_MESSAGES_POST]', error);
    return res.status(500).json({ message: 'Internal Error' });
  }
}
