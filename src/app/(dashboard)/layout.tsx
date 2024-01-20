import Navbar from "@/components/layouts/navbar";
import Sidebar from "@/components/layouts/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Sidebar />
      <div className="max-sm:left-0 max-sm:w-full absolute h-full w-[calc(100vw-6rem)] md:w-[calc(100vw-13rem)] lg:w-[calc(100vw-15rem)] top-0 left-24 md:left-52 lg:left-60">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
