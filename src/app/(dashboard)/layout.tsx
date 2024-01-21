import { LogoutButton } from '@/components/auth/logout-button';
import Navbar from '@/components/layouts/navbar';
import Sidebar from '@/components/layouts/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Sidebar />
      <div className="absolute left-24 top-0 h-full w-[calc(100vw-6rem)] max-sm:left-0 max-sm:w-full md:left-52 md:w-[calc(100vw-13rem)] lg:left-60 lg:w-[calc(100vw-15rem)]">
        <Navbar />
        {children}
      </div>
      <LogoutButton />
    </div>
  );
}
