'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { Loading } from '@shared/components';

interface Props {
  isOpen: boolean;
  close: () => void;
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
  title: string;
  subtitle?: string;
}

const LazyModal = lazy(async () => await import('./LazyModal'));

function Modal({ children, disabled = false, isOpen, close, title, subtitle }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {isModalOpen && (
        <Suspense fallback={<Loading />}>
          <LazyModal disabledActions={disabled} close={close} title={title} subtitle={subtitle}>
            {children}
          </LazyModal>
        </Suspense>
      )}
    </>
  );
}
export default Modal;
