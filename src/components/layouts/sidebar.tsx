"use client";

import { navLinks } from "@/lib/contants";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Separator } from "../ui/separator";

export default function Sidebar() {
  return (
    <div className="w-24 bg-gradient h-screen lg:w-60 md:w-52 pr-2 md:pr-4 lg:pr-6 py-2 md:py-4 lg:py-6 pl-1 md:pl-2 lg:pl-3 relative max-sm:hidden">
      <Link
        href="/"
        className="relative py-4 flex items-center justify-center w-full"
      >
        <h1 className="hidden md:block gradient-text">My Note</h1>
      </Link>
      <Separator className="bg-gradient-to-r from-transparent via-[#E0E1E2] to-transparent" />
      <div className="flex flex-col gap-6 mt-10">
        {navLinks.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="cursor-pointer font-semibold transition-colors duration-200 hover:back px-4 py-3 rounded-2xl flex items-center max-md:justify-center gap-4"
          >
            <item.icon />
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 w-full">
        <ThemeToggle classNames="bg2 w-[90%]" />
      </div>
    </div>
  );
}
