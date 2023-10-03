import { getCurrentUser } from '@/actions/user';
import SignleServerSidebar from '@/components/server/SignleServerSidebar';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

type SingleServerLayoutProps = React.PropsWithChildren<{
  params: { serverId: string };
}>;

const SingleServerLayout = async ({ children, params }: SingleServerLayoutProps) => {
  const profile = await getCurrentUser();
  if (!profile) {
    return redirect('/sign-in');
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });
  if (!server) {
    return redirect('/');
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 flex h-full w-60 flex-col max-md:invisible max-md:w-0">
        <SignleServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default SingleServerLayout;
