import { createUser, getCurrentUser } from '@/actions/user';
import LeftSidebar from '@/components/layout/LeftSidebar';
import MainNavbar from '@/components/layout/MainNavbar';
import RightSidebar from '@/components/layout/RightSidebar';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const clerkUser = await currentUser();
  const profile = await getCurrentUser();
  if (clerkUser && clerkUser.id && !profile) {
    await createUser({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: clerkUser.username!,
      imageUrl: clerkUser.imageUrl
    });
  }

  const myServers = profile
    ? await db.server.findMany({
        where: {
          profileId: profile?.id
        }
      })
    : [];

  return (
    <main className="relative bg-light-850 dark:bg-dark-100">
      <MainNavbar />
      <div className="flex">
        <LeftSidebar myServers={myServers} />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default MainLayout;
