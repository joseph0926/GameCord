import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import ServerNavigationAction from '@/components/server/ServerNavigationAction';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ServerNavigationItem from '@/components/server/ServerNavigationItem';
import ThemeToggle from '@/components/ui/theme-toggle';
import { UserButton } from '@clerk/nextjs';
import { getCurrentUser } from '@/actions/user';

const ServerSidebar = async () => {
  const profile = await getCurrentUser();
  if (!profile) {
    return redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  return (
    <div className="text-primary flex h-full w-full flex-col items-center space-y-4 py-3 dark:bg-[#1e1f22]">
      <ServerNavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <ServerNavigationItem name={server.name} imageUrl={server.imageUrl} id={server.id} />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ThemeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]'
            }
          }}
        />
      </div>
    </div>
  );
};

export default ServerSidebar;
