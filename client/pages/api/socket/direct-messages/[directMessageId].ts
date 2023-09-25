import { NextApiRequest } from 'next';
import { MemberRole } from '@prisma/client';

import { NextApiResponseServerIO } from '@/global';
import db from '@/lib/db';
import { getCurrentUserAsPage } from '@/lib/actions/user/fetchActions';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method !== 'DELETE' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getCurrentUserAsPage(req);
    const { directMessageId, groupMessageId } = req.query;
    const { content } = req.body;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!groupMessageId) {
      return res.status(400).json({ error: 'groupMessage ID missing' });
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
      return res.status(404).json({ error: 'groupMessage not found' });
    }

    const member = groupMessage.memberOne.userId === user.id ? groupMessage.memberOne : groupMessage.memberTwo;

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        groupMessageId: groupMessageId as string
      },
      include: {
        member: {
          include: {
            user: true
          }
        }
      }
    });

    if (!directMessage || directMessage.deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const isMessageOwner = directMessage.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'DELETE') {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string
        },
        data: {
          fileUrl: null,
          content: 'This message has been deleted.',
          deleted: true
        },
        include: {
          member: {
            include: {
              user: true
            }
          }
        }
      });
    }

    if (req.method === 'PATCH') {
      if (!isMessageOwner) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string
        },
        data: {
          content
        },
        include: {
          member: {
            include: {
              user: true
            }
          }
        }
      });
    }

    const updateKey = `chat:${groupMessage.id}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, directMessage);

    return res.status(200).json(directMessage);
  } catch (error) {
    console.log('[MESSAGE_ID]', error);
    return res.status(500).json({ error: 'Internal Error' });
  }
}
