import { getCurrentUser } from '@/lib/actions/user/fetchActions';
import db from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';
import ServerHeader from '@/components/server/ServerHeader';
import { Hash, ShieldAlert, ShieldCheck } from 'lucide-react';

type SignleServerSidebarProps = {
  serverId: string;
};

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Hash className="mr-2 h-4 w-4" />
};

export const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />
};

const SignleServerSidebar = async ({ serverId }: SignleServerSidebarProps) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc'
        }
      },
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

  if (!server) {
    return redirect('/');
  }

  const role = server.members.find((mem) => mem.userId === user.id)?.role;

  return (
    <div className="flex h-full w-full flex-col bg-[#f2f3f5] text-primary dark:bg-[#2b2d31]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default SignleServerSidebar;
