import { getCurrentUser } from '@/lib/actions/user/fetchActions';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/');
  }

  const server = await db.server.findUnique({
    where: { id: params.serverId, members: { some: { userId: user.id } } },
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
