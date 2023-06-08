'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoginModal, useRegisterModal } from '@modules/auth/hooks';
import { type LoginUserDto } from '@modules/auth/dtos';
import { Button, Divider, Modal } from '@shared/components';
import { FooterForm, LoginForm } from '@modules/auth/components';

function LoginModal(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onCLose } = useLoginModal();
  const { onOpen } = useRegisterModal();

  const onSubmit = async (payload: LoginUserDto): Promise<void> => {
    try {
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
      title='Login'
      subtitle='Login to your account'
      close={() => {
        onCLose();
      }}
    >
      <LoginForm
        onSubmit={(values) => {
          onSubmit(values);
        }}
      />
      <Divider />
      <Button
        type='button'
        text='Continue with Google'
        icon='/images/google.svg'
        onClick={() => {}}
      />
      <Button
        type='button'
        text='Continue with Github'
        icon='images/github.svg'
        onClick={() => {}}
      />
      <FooterForm text='Create an account' actionText='here' onClick={onNavigateModal} />
    </Modal>
  );
}
export default LoginModal;
