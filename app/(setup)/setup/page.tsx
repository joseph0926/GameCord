import SetupServerModal from '@/components/modal/SetupModal';
import { getCurrentUser } from '@/lib/actions/user';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
  await getCurrentUser();

  return <SetupServerModal />;
};

export default SetupPage;
