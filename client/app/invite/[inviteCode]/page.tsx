import { getCurrentUser } from '@/lib/actions/user/fetchActions';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const InviteCodePage = async ({ params }: { params: { inviteCode: string } }) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/sign-in');
  }
  if (!params.inviteCode) {
    return redirect('/');
  }

  const existingServer = await db.server.findFirst({
    where: { inviteCode: params.inviteCode, members: { some: { userId: user.id } } }
  });
  if (existingServer) {
    return redirect(`/server/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode
    },
    data: {
      members: {
        create: [{ userId: user.id }]
      }
    }
  });
  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <div />;
};

export default InviteCodePage;
