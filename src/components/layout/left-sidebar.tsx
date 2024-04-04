import { Search } from 'lucide-react';
import Image from 'next/image';
import { Input } from '../ui/input';
import LeftSidebarHome from './left-sidebar-home';
import LeftSidebarCategory from './left-sidebar-category';

export default function LeftSidebar() {
  return (
    <div className="flex h-full w-full flex-col gap-6 bg-gray-900 p-4">
      <div className="flex w-full items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <div className="text-xl font-semibold">
          Game<span className="text-sky-500">Cord</span>
        </div>
      </div>
      <div className="flex h-10 w-full items-center rounded-[12px] bg-gray-500/50 px-2">
        <Search className="h-6 w-6 cursor-pointer" />
        <Input
          type="text"
          placeholder="검색,,,"
          className="border-none bg-transparent pl-2.5 outline-none"
        />
      </div>
      <LeftSidebarHome />
      <LeftSidebarCategory />
    </div>
  );
}
