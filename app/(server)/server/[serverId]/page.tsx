import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  const profile = await getCurrentUser();
  if (!profile) {
    return redirect('/sign-in');
  }

  const server = await db.server.findUnique({
    where: { id: params.serverId, members: { some: { profileId: profile.id } } },
    include: {
      channels: {
        where: {
          name: 'general'
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });

  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== 'general') {
    return null;
  }

  return redirect(`/server/${params.serverId}/channel/${initialChannel?.id}`);
};

export default ServerPage;
