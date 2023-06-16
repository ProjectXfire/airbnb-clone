'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useLoginModal, useRegisterModal } from '@modules/auth/hooks';
import { type LoginUserDto } from '@modules/auth/dtos';
import { Button, Divider, Modal } from '@shared/components';
import { FooterForm, LoginForm } from '@modules/auth/components';
import { loginUser, signInWithGithub, signInWithGoogle } from '@modules/auth/services';

function LoginModal(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onCLose } = useLoginModal();
  const router = useRouter();
  const { onOpen } = useRegisterModal();

  const onSubmit = async (payload: LoginUserDto): Promise<void> => {
    setIsLoading(true);
    const res = await loginUser(payload);
    if (res.error) toast.error(res.error);
    if (!res.error) {
      toast.success('Successfully login');
      router.refresh();
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
      title='Login'
      subtitle='Login to your account'
      close={() => {
        onCLose();
      }}
    >
      <LoginForm
        onLoading={isLoading}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      />
      <Divider />
      <Button
        disabled={isLoading}
        type='button'
        text='Continue with Google'
        icon='/images/google.svg'
        onClick={() => {
          signInWithGoogle();
        }}
      />
      <Button
        disabled={isLoading}
        type='button'
        text='Continue with Github'
        icon='images/github.svg'
        onClick={() => {
          signInWithGithub();
        }}
      />
      <FooterForm
        text='First time using Airbnb?'
        actionText='Create an account'
        onClick={onNavigateModal}
      />
    </Modal>
  );
}
export default LoginModal;
