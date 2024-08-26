import { Box } from '@/components/ui/box';
import { LeftSidebarList } from './left-sidebar-list';

export function LeftSidebar() {
  return (
    <Box className="flex h-full w-36 flex-col items-center rounded-none">
      <h1 className="mb-20 mt-4 text-xl font-medium text-secondary">Logo</h1>
      <LeftSidebarList />
    </Box>
  );
}
