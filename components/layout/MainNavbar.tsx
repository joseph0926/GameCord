import { getCurrentUser } from '@/lib/actions/user';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { SignoutBtn } from '../ui/signout-btn';
import { ModeToggle } from '../ui/mode-toggle';

const MainNavbar = async () => {
  const session = await getCurrentUser();

  const navLinks = [
    { herf: '/posts', label: 'Posts' },
    { herf: '/mypage', label: 'Mypage' }
  ];

  return (
    <div className="flex justify-between gap-4 border-b border-zinc-400 px-8 py-5 dark:border-zinc-700">
      <div className="flex items-center justify-start gap-10">
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={45} height={15} />
        </Link>
        <ul className="hidden gap-7 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.herf} href={link.herf}>
              {link.label}
            </Link>
          ))}
          <TooltipProvider>
            <Tooltip delayDuration={10}>
              <TooltipTrigger asChild className={`${session?.user ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                <Link href="/setup">Server</Link>
              </TooltipTrigger>
              <TooltipContent>{session?.user ? <p>server</p> : <p>로그인이 필요한 서비스입니다.</p>}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ul>
      </div>
      <div className="flex items-center justify-center gap-4 text-sm">
        <ModeToggle />
        {session?.user ? (
          <SignoutBtn />
        ) : (
          <Button variant="outline" className="border-2 border-zinc-700 bg-transparent dark:border-zinc-400">
            <Link href="/auth" className="">
              로그인
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;
