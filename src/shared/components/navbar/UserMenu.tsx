'use client';

import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import styles from '@shared/styles/navbar/UserMenu.module.scss';
import { useRegisterModal, useLoginModal } from '@/modules/auth/hooks';
import { DropdownContainer } from '@shared/components';

function UserMenu(): JSX.Element {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = (): void => {
    setIsMenuOpen((cv) => !cv);
  };

  const checkIfClickedOutsideDropdown = (e: any): void => {
    if (dropdownRef.current === null || menuRef.current === null) return;
    if (dropdownRef.current.contains(e.target)) return;
    if (menuRef.current.contains(e.target)) return;
    if (!dropdownRef.current.contains(e.target)) {
      setIsMenuOpen((cv) => (cv = false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutsideDropdown);
    };
  }, []);

  return (
    <>
      <div className={styles['user-menu']}>
        <div className={styles['user-menu__items']}>
          <button type='button' className={styles['']}>
            Airbnb your home
          </button>
          <button ref={menuRef} type='button' className={styles['']} onClick={handleMenu}>
            <MdMenu />
            <NextImage width={30} height={30} src='/images/placeholder.jpg' alt='user-image' />
          </button>
          <button type='button'>
            <MdMenu />
          </button>
        </div>
        {isMenuOpen && (
          <DropdownContainer ddRef={dropdownRef}>
            <DropdownContainer.DropdownItemModal
              text='Sign in'
              useModalStore={useLoginModal}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            />
            <DropdownContainer.DropdownItemModal
              text='Sign up'
              useModalStore={useRegisterModal}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            />
          </DropdownContainer>
        )}
      </div>
    </>
  );
}
export default UserMenu;
