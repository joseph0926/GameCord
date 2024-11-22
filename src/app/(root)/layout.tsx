import { Sidebar } from '@/components/layouts/sidebar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <section className="flex min-h-screen w-full flex-1 flex-col px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </section>
    </main>
  );
}
