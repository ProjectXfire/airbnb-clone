import { type ModalStore } from '@/shared/models';
import { create } from 'zustand';

const useRentModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onCLose: () => {
    set({ isOpen: false });
  }
}));

export default useRentModal;
