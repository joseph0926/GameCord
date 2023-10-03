'use client';

import CreateChannelModal from '@/components/modal/CreateChannelModal';
import CreateServerModal from '@/components/modal/CreateServerModal';
import EditServerModal from '@/components/modal/EditServerModal';
import InviteServerModal from '@/components/modal/InviteServerModal';
import MembersModal from '@/components/modal/MembersModal';
import MyServerListModal from '@/components/modal/MyServerListModal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <MyServerListModal />
      <InviteServerModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
    </>
  );
};
