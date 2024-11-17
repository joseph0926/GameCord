import { LeftSidebar } from '@/components/layouts/left-sidebar';
import { Navbar } from '@/components/layouts/navbar';
import { RightSidebar } from '@/components/layouts/right-sidebar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
}
