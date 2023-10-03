import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import GlobalSearch from '@/components/home/GlobalSearch';
import ThemeToggle from '@/components/ui/theme-toggle';
import MainMobileNavbar from '@/components/layout/MainMobileNavbar';

const MainNavbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full gap-5 p-6 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/images/logo.png" width={30} height={30} alt="TripCord" />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Trip<span className="text-primary-500">Cord</span>
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
        <MainMobileNavbar />
      </div>
    </nav>
  );
};

export default MainNavbar;
