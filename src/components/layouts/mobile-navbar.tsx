import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ROUTES } from '@/constants/routes';
import { NavLinks } from './nav-links';

export const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerMenuIcon className="absolute left-4 top-4 size-8 dark:invert sm:hidden" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="h-full border-none bg-white dark:bg-gray-800"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <h1>Logo</h1>
          <p className="font-['Space_Grotesk'] text-2xl font-bold text-gray-900 dark:text-gray-50">
            <span className="text-blue-500">Game</span>Cord
          </p>
        </Link>

        <div className="scrollbar-none flex flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="min-h-[41px] w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium shadow-none hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Log In
                  </span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="min-h-[41px] w-full rounded-lg border-2 border-gray-200 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 shadow-none hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
