import ServerSidebar from '@/components/layout/ServerSidebar';

const ServerLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 flex h-full w-[72px] flex-col max-md:invisible max-md:w-0">
        <ServerSidebar />
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default ServerLayout;
