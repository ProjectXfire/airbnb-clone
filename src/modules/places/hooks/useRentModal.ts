import { type IModal } from '@/shared/models';
import { create } from 'zustand';

const useRentModal = create<IModal>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onCLose: () => {
    set({ isOpen: false });
  }
}));

export default useRentModal;
