import SetupServerModal from '@/components/modal/SetupModal';
import { createUser } from '@/lib/actions/user/mutateActions';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
  const user = await createUser();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: user
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
