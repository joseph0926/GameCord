import { Menu } from 'lucide-react';
import { Button } from './button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ServerSidebar from '../layout/ServerSidebar';
import SignleServerSidebar from '../layout/SignleServerSidebar';

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
