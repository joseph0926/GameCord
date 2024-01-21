import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Link from 'next/link';
import { navLinks } from '@/lib/contants';
import { Separator } from '@/components/ui/separator';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex h-8 w-10 flex-col justify-around">
          <div className="hamburger-line line1 h-0.5 w-8 bg-white"></div>
          <div className="hamburger-line line2 h-0.5 w-8 bg-white"></div>
          <div className="hamburger-line line3 h-0.5 w-8 bg-white"></div>
        </div>
      </SheetTrigger>
      <SheetContent className="bg-gradient border-none">
        <>
          <Link
            href="/dashboard"
            className="relative flex w-full items-center justify-center py-4"
          >
            <h1 className="gradient-text">My Note</h1>
          </Link>
          <Separator className="bg-gradient-to-r from-transparent via-[#E0E1E2] to-transparent" />
          <div className="mt-10 flex flex-col gap-6">
            {navLinks.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="text hover:back flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 font-semibold transition-colors duration-200"
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-4 w-full">
            <ThemeToggle classNames="w-[90%]" />
          </div>
        </>
      </SheetContent>
    </Sheet>
  );
}
