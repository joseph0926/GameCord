import { BarChartHorizontal, LayoutGrid } from 'lucide-react';
import MainNavbarTabs from './main-navbar-tabs';

export default function MainNavbar() {
  return (
    <div className="fixed left-[15rem] top-0 flex h-[5rem] w-[calc(100%-15rem)] items-center justify-between border-b border-solid border-gray-900 bg-transparent px-6 py-3">
      <MainNavbarTabs />
      <div className="flex items-center gap-4">
        <LayoutGrid className="h-8 w-8 cursor-pointer text-gray-400" />
        <BarChartHorizontal className="h-8 w-8 cursor-pointer text-gray-400" />
      </div>
    </div>
  );
}
