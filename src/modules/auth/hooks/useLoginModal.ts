import { create } from 'zustand';
import { type ModalStore } from '@/shared/models';

const useLoginModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onCLose: () => {
    set({ isOpen: false });
  }
}));

export default useLoginModal;
