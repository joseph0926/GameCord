import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
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

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string
      }
    });
    if (!channel) {
      return new NextResponse('Channel not found', { status: 400 });
    }

    const member = server.members.find((mem) => mem.profileId === profile.id);
    if (!member) {
      return new NextResponse('Member not found', { status: 400 });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    });

    const timestamp = Date.now();

    const channelKey = `chat:${channelId}:messages`;
    await redis.zadd(channelKey, { score: timestamp, member: JSON.stringify(message) });

    return NextResponse.json({ message });
  } catch (error) {
    console.log('[POST_MESSAGE_ERROR]: ', error);
    return new NextResponse('Server Error', { status: 500 });
  }
};
