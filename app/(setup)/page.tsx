import { createUser } from '@/lib/actions/user/mutateActions';

const SetupPage = async () => {
  const user = await createUser();

  return <div />;
};

export default SetupPage;
