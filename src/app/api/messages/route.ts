import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { pusherServer, toPusherKey } from '@/lib/pusher';
import { fetchRedis, redis } from '@/lib/redis';
import { Message } from '@prisma/client';
import { NextResponse } from 'next/server';

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await getCurrentUser();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get('cursor');
    const channelId = searchParams.get('channelId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!channelId) {
      return new NextResponse('Channel ID missing', { status: 400 });
    }

    let messages: Message[] = [];

    const cacheKey = `channel:${channelId}:messages`;
    const cachedMessages = await fetchRedis('get', cacheKey);

    if (cachedMessages && !cursor) {
      messages = JSON.parse(cachedMessages);
    } else {
      if (cursor) {
        messages = await db.message.findMany({
          take: MESSAGES_BATCH,
          skip: 1,
          cursor: {
            id: cursor
          },
          where: {
            channelId
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
        messages = await db.message.findMany({
          take: MESSAGES_BATCH,
          where: {
            channelId
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

      await redis.set(cacheKey, JSON.stringify(messages), { ex: 86400 });
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
    console.log('[MESSAGES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export const POST = async (req: Request) => {
  try {
    const profile = await getCurrentUser();
    const { content, fileUrl } = await req.json();
    const serverId = new URL(req.url).searchParams.get('serverId');
    const channelId = new URL(req.url).searchParams.get('channelId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 });
    }
    if (!channelId) {
      return new NextResponse('Channel ID is missing', { status: 400 });
    }
    if (!content) {
      return new NextResponse('Content is missing', { status: 400 });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        members: true
      }
    });
    if (!server) {
      return new NextResponse('Server not found', { status: 400 });
    }

    const member = server.members.find((mem) => mem.profileId === profile.id);
    if (!member) {
      return new NextResponse('Member not found', { status: 400 });
    }

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newMessage = {
      content,
      fileUrl,
      channelId,
      createdAt,
      updatedAt,
      member: {
        id: member.id,
        role: member.role,
        profile: {
          imageUrl: profile.imageUrl,
          name: profile.name
        }
      }
    };

    const cacheKey = `channel:${channelId}:messages`;

    let cachedMessages: string | null = await fetchRedis('get', cacheKey);
    let messages = cachedMessages ? JSON.parse(cachedMessages) : [];
    messages.unshift(newMessage);
    await redis.set(cacheKey, JSON.stringify(messages), { ex: 86400 });

    const pusherChannel = toPusherKey(`chat:${channelId}`);

    const pusherEvent = 'new-message';
    await pusherServer
      .trigger(pusherChannel, pusherEvent, {
        message: newMessage
      })
      .catch((error) => console.log('Pusher error:', error));

    const saveMessageToDB = async (messageData: any) => {
      try {
        await db.message.create({
          data: {
            content: messageData.content,
            fileUrl: messageData.fileUrl,
            channelId: channelId,
            memberId: member.id,
            createdAt: new Date(messageData.createdAt),
            updatedAt: new Date(messageData.updatedAt)
          }
        });
      } catch (error) {
        console.error('Failed to save message to DB:', error);
      }
    };

    saveMessageToDB(newMessage);

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log('[POST_MESSAGE_ERROR]: ', error);
    return new NextResponse('Server Error', { status: 500 });
  }
};
