import { getCurrentUser } from '@/lib/actions/user';
import db from '@/lib/db';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';
import ServerHeader from '@/components/server/ServerHeader';
import { Hash, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import ServerSearch from '@/components/server/ServerSearch';
import ServerSection from '@/components/server/ServerSection';
import ServerChannel from '@/components/server/ServerChannel';
import ServerMember from '@/components/server/ServerMember';

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
    return redirect('/');
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

  const textChannels = server?.channels.filter((ch) => ch.type === ChannelType.TEXT);
  const audioChannels = server?.channels.filter((ch) => ch.type === ChannelType.AUDIO);

  const members = server?.members.filter((mem) => mem.userId !== user.id);

  if (!server) {
    return redirect('/');
  }

  const role = server.members.find((mem) => mem.userId === user.id)?.role;

  return (
    <div className="flex h-full w-full flex-col bg-[#f2f3f5] text-primary dark:bg-[#2b2d31]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: 'Audio Channels',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.user.name,
                  icon: roleIconMap[member.role]
                }))
              }
            ]}
          />
        </div>
        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection sectionType="channels" channelType={ChannelType.TEXT} role={role} label="Text Channels" />
            {textChannels.map((channel) => (
              <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
            ))}
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection sectionType="channels" channelType={ChannelType.AUDIO} role={role} label="Audio Channels" />
            {audioChannels.map((channel) => (
              <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
            ))}
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection sectionType="memebers" server={server} role={role} label="Members" />
            {members.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SignleServerSidebar;
