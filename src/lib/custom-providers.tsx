'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
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
import { ClerkProvider } from '@clerk/nextjs';

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

export default function CustomProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem={false} storageKey="game-cord-theme">
          <ModalProvider />
          <Toaster />
          {children}
        </NextThemesProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
