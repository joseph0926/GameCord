import { createUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const NewUser = async () => {
  const newProfile = await createUser();
  if (newProfile && newProfile !== '' && newProfile !== 'null') {
    redirect('/');
  }

  return <div>NewUser</div>;
};

export default NewUser;
