'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

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
      {/* <CreateServerModal />
      <InviteServerModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
      <DeleteChannelModal />
      <MessageFileModal />
      <DeleteMessageModal /> */}
    </>
  );
};

export default function CustomProviders({
  children
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="game-cord-theme"
      >
        <ModalProvider />
        <Toaster />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
