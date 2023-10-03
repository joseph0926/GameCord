'use client';

import CreateServerModal from '@/components/modal/CreateServerModal';
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
    </>
  );
};
