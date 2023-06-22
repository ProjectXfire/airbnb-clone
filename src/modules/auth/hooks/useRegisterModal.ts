import { create } from 'zustand';
import { type IModal } from '@/shared/models';

const useRegisterModal = create<IModal>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onCLose: () => {
    set({ isOpen: false });
  }
}));

export default useRegisterModal;
