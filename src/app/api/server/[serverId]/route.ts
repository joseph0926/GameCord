import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await getCurrentUser();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID_DELETE]', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await getCurrentUser();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID_PATCH]', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}
