'use client';

import { UserButton, useUser } from '@clerk/nextjs';

const UserButtonWrapper = () => {
  const { user } = useUser();
  if (!user) {
    return null;
  }

  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: 'h-10 w-10'
        },
        variables: {
          colorPrimary: '#ff7000'
        }
      }}
    />
  );
};

export default UserButtonWrapper;
