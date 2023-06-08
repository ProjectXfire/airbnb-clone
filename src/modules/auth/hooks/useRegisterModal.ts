import { create } from 'zustand';
import { type AuthModalStore } from '@modules/auth/models';

const useRegisterModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onCLose: () => {
    set({ isOpen: false });
  }
}));

export default useRegisterModal;
