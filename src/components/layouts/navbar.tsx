import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between h-24 bg-gradient2 w-full p-4">
      <h2 className="font-semibold text-[14px] hidden md:block">Dashboard</h2>
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
