import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "../ui/theme-toggle";
import Link from "next/link";
import { navLinks } from "@/lib/contants";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-col justify-around w-10 h-8">
          <div className="hamburger-line line1 w-8 h-0.5 bg-white"></div>
          <div className="hamburger-line line2 w-8 h-0.5 bg-white"></div>
          <div className="hamburger-line line3 w-8 h-0.5 bg-white"></div>
        </div>
      </SheetTrigger>
      <SheetContent className="bg-gradient border-none">
        <>
          <div className="flex flex-col gap-6 mt-10">
            {navLinks.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="cursor-pointer font-semibold text transition-colors duration-200 hover:back px-4 py-3 rounded-2xl flex items-center gap-4"
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
