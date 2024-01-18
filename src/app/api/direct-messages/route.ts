import { NextResponse } from 'next/server';
import { DirectMessage } from '@prisma/client';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';
import { fetchRedis, redis } from '@/lib/redis';

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await getCurrentUser();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get('cursor');
    const conversationId = searchParams.get('conversationId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse('Conversation ID missing', { status: 400 });
    }

    let directMessage: DirectMessage[] = [];

    const cacheKey = `conversation:${conversationId}:directMessage`;
    const cachedMessages = await fetchRedis('get', cacheKey);

    if (cachedMessages && !cursor) {
      directMessage = JSON.parse(cachedMessages);
    } else {
      if (cursor) {
        directMessage = await db.directMessage.findMany({
          take: MESSAGES_BATCH,
          skip: 1,
          cursor: {
            id: cursor
          },
          where: {
            conversationId
          },
          include: {
            member: {
              include: {
                profile: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      } else {
        directMessage = await db.directMessage.findMany({
          take: MESSAGES_BATCH,
          where: {
            conversationId
          },
          include: {
            member: {
              include: {
                profile: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      await redis.set(cacheKey, JSON.stringify(directMessage), { ex: 86400 });
    }

    let nextCursor = null;

    if (directMessage.length === MESSAGES_BATCH) {
      nextCursor = directMessage[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: directMessage,
      nextCursor
    });
  } catch (error) {
    console.log('[DIRECT_MESSAGES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
