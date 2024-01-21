import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import MobileSidebar from '@/components/layouts/mobile-sidebar';
import { UserButton } from '@/components/auth/user-button';

export default function Navbar() {
  return (
    <div className="bg-gradient2 flex h-24 w-full items-center justify-between p-4 px-8">
      <h2 className="hidden text-[14px] font-semibold md:block">Dashboard</h2>
      <div className="w-[80%] items-center justify-center max-sm:flex sm:w-[70%] md:w-[60%]">
        <span className="relative">
          <Search className="text2 absolute left-2 top-[50%] h-6 w-6 translate-y-[-50%]" />
          <Input
            type="text"
            placeholder="Search"
            className="rounded-2xl pl-10 pr-6"
          />
        </span>
      </div>
      <div className="mb-3 block sm:hidden">
        <MobileSidebar />
      </div>
      <div className="hidden sm:block">
        <UserButton />
      </div>
    </div>
  );
}
