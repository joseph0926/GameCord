import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const PATCH = async (req: Request, { params }: { params: { memberId: string } }) => {
  try {
    const profile = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    if (!profile) {
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
        profileId: profile.id
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id
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
            profile: true
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

export async function DELETE(req: Request, { params }: { params: { memberId: string } }) {
  try {
    const profile = await getCurrentUser();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse('Member ID is missing', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[MEMBER_ID_DELETE]', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}
