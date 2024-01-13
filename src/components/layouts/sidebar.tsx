import { navLinks } from "@/lib/contants";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Sidebar() {
  return (
    <div className="w-24 bg2 h-screen lg:w-60 md:w-52 pr-2 md:pr-4 lg:pr-6 py-2 md:py-4 lg:py-6 pl-1 md:pl-2 lg:pl-3 relative">
      <div className="flex items-center justify-around w-full">
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full rounded-full"
          />
        </div>
        <h1 className="hidden md:block font-bold md:text-[20px] lg:text-[28px]">
          MyNote
        </h1>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        {navLinks.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="cursor-pointer font-semibold hover:priText500 transition-colors duration-200 hover:back px-4 py-3 rounded-2xl flex items-center max-md:justify-center gap-4"
          >
            <item.icon />
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 w-full">
        <ThemeToggle classNames="w-[90%]" />
      </div>
    </div>
  );
}
