'use client';

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/lib/contants';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { Game, Server } from '@prisma/client';

const NavbarContent = ({
  servers,
  games
}: {
  servers: Server[] | null;
  games: Game[] | null;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen, data } = useModal();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname?.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === '/server') {
          return (
            <div
              key={item.route}
              onClick={() => {}}
              className={`${
                isActive
                  ? 'primary-gradient cursor-pointer rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {item.label}
              </p>
            </div>
          );
        }

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MainMobileNavbar = ({
  servers,
  games
}: {
  servers: Server[] | null;
  games: Game[] | null;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/images/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" width={23} height={23} alt="DevFlow" />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Game<span className="text-primary-500">Cord</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavbarContent servers={servers} games={games} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainMobileNavbar;
