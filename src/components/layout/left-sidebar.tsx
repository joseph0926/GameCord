import { Box } from '@/components/ui/box';
import Image from 'next/image';
import Link from 'next/link';
import { LeftSidebarList } from './left-sidebar-list';

export function LeftSidebar() {
  return (
    <Box className="flex h-full w-36 flex-col items-center rounded-none">
      <Link href="/" className="mb-20 mt-4 flex items-center gap-4">
        <Image src="/images/logo.png" width={36} height={36} alt="GameCord" />
      </Link>
      <LeftSidebarList />
    </Box>
  );
}
