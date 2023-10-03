import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const profile = await getCurrentUser();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const serverId = searchParams.get('serverId');
    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 });
    }

    if (name === 'general') {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MANAGER]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNEL_POST]', error);
    return new NextResponse('Server Error', { status: 500 });
  }
};
