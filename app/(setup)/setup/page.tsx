import SetupServerModal from '@/components/modal/SetupModal';
import { getCurrentUser } from '@/lib/actions/user/fetchActions';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/');
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: user.id
        }
      }
    }
  });
  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <SetupServerModal />;
};

export default SetupPage;
