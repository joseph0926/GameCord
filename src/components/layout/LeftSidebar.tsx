'use client';

import { sidebarLinks } from '@/lib/contants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { SignedOut, useUser } from '@clerk/nextjs';
import { useModal } from '@/hooks/useModal';
import { Game, Server } from '@prisma/client';

const LeftSidebar = ({ games, servers }: { games: Game[] | null; servers: Server[] | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen } = useModal();
  const { user } = useUser();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname?.includes(item.route) && item.route.length > 1) || pathname === item.route;
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
                    onOpen('createServer', { games, servers });
                  }
                }}
                className={`${
                  isActive ? 'primary-gradient cursor-pointer rounded-lg text-light-900' : 'text-dark300_light900'
                }  flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image src={item.imgURL} alt={item.label} width={20} height={20} className={`${isActive ? '' : 'invert-colors'}`} />
                <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>{item.label}</p>
              </div>
            );
          }

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`${
                isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'
              }  flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image src={item.imgURL} alt={item.label} width={20} height={20} className={`${isActive ? '' : 'invert-colors'}`} />
              <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>{item.label}</p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="absolute bottom-10 left-0 flex w-full flex-col gap-3 p-6">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image src="/images/account.svg" alt="login" width={20} height={20} className="invert-colors lg:hidden" />
              <span className="primary-text-gradient max-lg:hidden">Log In</span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <Image src="/images/sign-up.svg" alt="sign up" width={20} height={20} className="invert-colors lg:hidden" />
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
