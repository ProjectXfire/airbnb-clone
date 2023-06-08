'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { type NewUserDto } from '@modules/auth/dtos';
import { useRegisterModal, useLoginModal } from '@modules/auth/hooks';
import { FooterForm, RegisterForm } from '@modules/auth/components';
import { Modal } from '@shared/components';

function RegisterModal(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onCLose } = useRegisterModal();
  const { onOpen } = useLoginModal();

  const onSubmit = async (payload: NewUserDto): Promise<void> => {
    try {
      console.log(payload);
      setIsLoading(true);
      onCLose();
    } catch (error) {
      toast.error('Register has failed');
    } finally {
      setIsLoading(false);
    }
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
        onSubmit={(values) => {
          onSubmit(values);
        }}
      />
      <FooterForm text='Already have an account?' actionText='Sign In' onClick={onNavigateModal} />
    </Modal>
  );
}
export default RegisterModal;
