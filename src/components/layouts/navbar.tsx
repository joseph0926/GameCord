import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between h-24 bg-gradient2 w-full p-4">
      <Link href="/" className="block sm:hidden">
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full rounded-full"
          />
        </div>
      </Link>
      <h2 className="font-semibold text-[20px] hidden md:block">Dashboard</h2>
      <div className="max-sm:flex items-center justify-center">
        <span className="relative">
          <Search className="absolute top-[50%] text2 translate-y-[-50%] left-2 w-6 h-6" />
          <Input
            type="text"
            placeholder="Search"
            className="rounded-2xl pr-6 pl-10"
          />
        </span>
      </div>
      <div className="block mb-3 sm:hidden">
        <MobileSidebar />
      </div>
    </div>
  );
}
