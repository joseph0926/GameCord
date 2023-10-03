import { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = 'createServer' | 'serverList' | 'invite' | 'editServer' | 'members' | 'createChannel';

type ModalData = {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  myServers?: Server[];
};

type ModalProps = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalProps>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false })
}));
