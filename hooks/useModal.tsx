import { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = 'createServer';

type ModalData = {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
};

type ModalStoreProps = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStoreProps>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false })
}));
