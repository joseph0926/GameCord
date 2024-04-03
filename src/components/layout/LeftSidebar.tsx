'use client';

import { sidebarLinks } from '@/lib/contants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useModal } from '@/hooks/useModal';
import { Game, Server } from '@prisma/client';

const LeftSidebar = ({
  servers,
  games
}: {
  servers: Server[] | null;
  games: Game[] | null;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname?.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          if (item.route === '/profile') {
            if (user) {
              item.route = `${item.route}/${user.id}`;
            } else {
              return null;
            }
          }

          if (item.route === '/server') {
            return (
              <div
                key={item.route}
                onClick={() => {
                  if (!user) {
                    router.push('/sign-in');
                  }
                  if (user) {
                    onOpen('createServer', { servers, games });
                  }
                }}
                className={`${
                  isActive
                    ? 'primary-gradient cursor-pointer rounded-lg text-light-900'
                    : 'text-dark300_light900'
                }  flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? '' : 'invert-colors'}`}
                />
                <p
                  className={`${
                    isActive ? 'base-bold' : 'base-medium'
                  } max-lg:hidden`}
                >
                  {item.label}
                </p>
              </div>
            );
          }

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              }  flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p
                className={`${
                  isActive ? 'base-bold' : 'base-medium'
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
