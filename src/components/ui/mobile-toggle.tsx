import { Menu } from 'lucide-react';
import { Button } from './button';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import ServerSidebar from '@/components/server/ServerSidebar';
import SignleServerSidebar from '@/components/server/SignleServerSidebar';

const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-[72px]">
          <ServerSidebar />
        </div>
        <SignleServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
