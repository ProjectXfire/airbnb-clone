'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { type NewUserDto } from '@modules/auth/dtos';
import { registerUser } from '@modules/auth/services';
import { useRegisterModal, useLoginModal } from '@modules/auth/hooks';
import { FooterForm, RegisterForm } from '@modules/auth/components';
import { Modal } from '@shared/components';

function RegisterModal(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onCLose } = useRegisterModal();
  const { onOpen } = useLoginModal();

  const onSubmit = async (payload: NewUserDto): Promise<void> => {
    setIsLoading(true);
    const res = await registerUser(payload);
    if (res.error) toast.error(res.error);
    if (res.data) {
      toast.success('Successfully registered');
      onCLose();
    }
    setIsLoading(false);
  };

  const onNavigateModal = (): void => {
    onCLose();
    onOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      disabled={isLoading}
      title='Register'
      subtitle='Create an account'
      close={() => {
        onCLose();
      }}
    >
      <RegisterForm
        onLoading={isLoading}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      />
      <FooterForm text='Already have an account?' actionText='Sign In' onClick={onNavigateModal} />
    </Modal>
  );
}
export default RegisterModal;
