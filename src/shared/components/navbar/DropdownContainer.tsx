'use client';

import { type RefObject } from 'react';
import styles from '@shared/styles/navbar/DropdownContainer.module.scss';
import type { StoreApi, UseBoundStore } from 'zustand';
import type { IModal } from '@shared/models';

interface Props {
  children: JSX.Element | JSX.Element[];
  ddRef: RefObject<HTMLDivElement>;
}

interface ItemProps {
  text: string;
  onClick?: () => void;
  useModalStore?: UseBoundStore<StoreApi<IModal>>;
}

function DropdownContainer({ children, ddRef }: Props): JSX.Element {
  return (
    <div ref={ddRef} className={styles['dropdown-container']}>
      {children}
    </div>
  );
}

function DropdownItemModal({ text, onClick, useModalStore }: ItemProps): JSX.Element {
  const modalStore = useModalStore ? useModalStore() : null;

  const onMenuItemClick = (): void => {
    if (modalStore) modalStore.onOpen();
    if (onClick) {
      onClick();
    }
  };

  return (
    <p className={styles['dropdown-item']} onClick={onMenuItemClick}>
      {text}
    </p>
  );
}

DropdownContainer.DropdownItemModal = DropdownItemModal;

export default DropdownContainer;
