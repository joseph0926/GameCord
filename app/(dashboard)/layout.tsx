import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { getCurrentUser } from '@/lib/actions/user';
import { User } from '@prisma/client';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getCurrentUser();
  const user = session?.user as User;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#4b013b] via-[#10032e_40%_70%] to-[#862661]">
      <DashboardSidebar user={user} />
      {children}
    </div>
  );
};

export default DashboardLayout;
