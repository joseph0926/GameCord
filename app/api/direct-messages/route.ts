import { NextResponse } from 'next/server';
import { DirectMessage } from '@prisma/client';

import db from '@/lib/db';
import { getCurrentUser } from '@/lib/actions/user';

const MESSAGES_BATCH = 10;

export const GET = async (req: Request) => {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get('cursor');
    const groupMessageId = searchParams.get('groupMessageId');

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!groupMessageId) {
      return new NextResponse('Conversation ID missing', { status: 400 });
    }

    let messages: DirectMessage[] = [];

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor
        },
        where: {
          groupMessageId
        },
        include: {
          member: {
            include: {
              user: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } else {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          groupMessageId
        },
        include: {
          member: {
            include: {
              user: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    });
  } catch (error) {
    console.log('[DIRECT_MESSAGES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
