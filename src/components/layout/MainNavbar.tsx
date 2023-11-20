import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import GlobalSearch from '@/components/home/GlobalSearch';
import ThemeToggle from '@/components/ui/theme-toggle';
import MainMobileNavbar from '@/components/layout/MainMobileNavbar';
import { Game, Server } from '@prisma/client';

const MainNavbar = ({ profileId, games, servers }: { profileId: string; games: Game[] | null; servers: Server[] | null }) => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/images/logo.png" width={30} height={30} alt="GameCord" />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Game<span className="text-primary-500">Cord</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <ThemeToggle />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: '#ff7000'
              }
            }}
          />
        </SignedIn>
        <MainMobileNavbar profileId={profileId} games={games} servers={servers} />
      </div>
    </nav>
  );
};

export default MainNavbar;
