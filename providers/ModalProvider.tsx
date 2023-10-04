'use client';

import CreateChannelModal from '@/components/modal/CreateChannelModal';
import CreateServerModal from '@/components/modal/CreateServerModal';
import { DeleteChannelModal } from '@/components/modal/DeleteChannelModal';
import { DeleteMessageModal } from '@/components/modal/DeleteMessageModal';
import { DeleteServerModal } from '@/components/modal/DeleteServerModal';
import EditServerModal from '@/components/modal/EditServerModal';
import InviteServerModal from '@/components/modal/InviteServerModal';
import { LeaveServerModal } from '@/components/modal/LeaveServerModal';
import MembersModal from '@/components/modal/MembersModal';
import { MessageFileModal } from '@/components/modal/MessageFileModal';
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
      <DeleteServerModal />
      <LeaveServerModal />
      <DeleteChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
