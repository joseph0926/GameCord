'use client';

import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { SignedOut, auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/lib/contants';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { Game, Server } from '@prisma/client';

const NavbarContent = ({ games, servers }: { games: Game[] | null; servers: Server[] | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen, data } = useModal();
  const { userId } = auth();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive = (pathname?.includes(item.route) && item.route.length > 1) || pathname === item.route;

        if (item.route === '/profile') {
          if (userId) {
            item.route = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }
        if (item.route === '/server') {
          return (
            <div
              key={item.route}
              onClick={() => {
                if (!userId) {
                  router.push('/sign-in');
                }
                if (userId) {
                  onOpen('createServer', { games, servers });
                }
              }}
              className={`${
                isActive ? 'primary-gradient cursor-pointer rounded-lg text-light-900' : 'text-dark300_light900'
              } flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image src={item.imgURL} alt={item.label} width={20} height={20} className={`${isActive ? '' : 'invert-colors'}`} />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>{item.label}</p>
            </div>
          );
        }

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image src={item.imgURL} alt={item.label} width={20} height={20} className={`${isActive ? '' : 'invert-colors'}`} />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MainMobileNavbar = ({ games, servers }: { games: Game[] | null; servers: Server[] | null }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/images/hamburger.svg" width={36} height={36} alt="Menu" className="invert-colors sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" width={23} height={23} alt="DevFlow" />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Game<span className="text-primary-500">Cord</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavbarContent games={games} servers={servers} />
          </SheetClose>
          <SignedOut>
            <div className="absolute bottom-10 left-0 flex w-full flex-col gap-3 p-6">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainMobileNavbar;
