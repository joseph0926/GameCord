import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between h-24 bg2 w-full p-4">
      <h2 className="font-semibold text-[20px] hidden md:block">Dashboard</h2>
      <div>
        <span className="relative">
          <Search className="absolute top-[50%] text2 translate-y-[-50%] left-2 w-6 h-6" />
          <Input
            type="text"
            placeholder="Search"
            className="rounded-2xl pr-6 pl-10"
          />
        </span>
      </div>
    </div>
  );
}
