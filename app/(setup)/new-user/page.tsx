import { createUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const NewUser = async () => {
  const newProfile = await createUser();
  console.log(newProfile);

  if (newProfile && newProfile !== '' && newProfile !== 'null') {
    redirect('/');
  }

  return <div>NewUser</div>;
};

export default NewUser;
