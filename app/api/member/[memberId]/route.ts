import { getCurrentUser } from '@/lib/actions/user';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export const PATCH = async (req: Request, { params }: { params: { memberId: string } }) => {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const serverId = searchParams.get('serverId');
    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 });
    }
    if (!params.memberId) {
      return new NextResponse('Member Id is missing', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        userId: user.id
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              userId: {
                not: user.id
              }
            },
            data: {
              role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            user: true
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[MEMBER_ID_PATCH]', error);
    return new NextResponse('Server Error', { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { memberId: string } }) => {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const serverId = searchParams.get('serverId');
    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 });
    }
    if (!params.memberId) {
      return new NextResponse('Member Id is missing', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        userId: user.id
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            userId: {
              not: user.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            user: true
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[MEMBER_DELETE]', error);
    return new NextResponse('Server Error', { status: 500 });
  }
};
