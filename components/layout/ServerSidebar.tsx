import { getCurrentUser } from '@/lib/actions/user/fetchActions';
import db from '@/lib/db';
import NavigationAction from '@/components/layout/NavigationAction';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import NavigationItem from '@/components/layout/NavigationItem';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { redirect } from 'next/navigation';
import { SignoutButton } from './SignoutButton';

const ServerSidebar = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId: user.id
        }
      }
    }
  });

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1e1f22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem name={server.name} imageUrl={server.imageUrl} id={server.id} />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <SignoutButton />
      </div>
    </div>
  );
};

export default ServerSidebar;
