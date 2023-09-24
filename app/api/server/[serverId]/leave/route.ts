import { getCurrentUser } from '@/lib/actions/user/fetchActions';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export const PATCH = async (req: Request, { params }: { params: { serverId: string } }) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse('Server ID is missing', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        userId: {
          not: user.id
        },
        members: {
          some: {
            userId: user.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            userId: user.id
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_LEAVE', error);
    return new NextResponse('Server error', { status: 500 });
  }
};
