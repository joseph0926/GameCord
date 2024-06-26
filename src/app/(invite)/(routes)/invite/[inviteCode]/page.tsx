import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';
import { paths } from '@/lib/paths';

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await getCurrentUser();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect(paths.home());
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(paths.server(existingServer.id));
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          }
        ]
      }
    }
  });

  if (server) {
    return redirect(paths.server(server.id));
  }

  return null;
};

export default InviteCodePage;
