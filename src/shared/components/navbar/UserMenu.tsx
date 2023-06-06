'use client';

import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import styles from '@shared/styles/navbar/UserMenu.module.scss';
import DropdownContainer from './DropdownContainer';

function UserMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  const handleMenu = (): void => {
    setIsOpen((cv) => !cv);
  };

  const checkIfClickedOutsideDropdown = (e: any): void => {
    if (dropdownRef.current === null || menuRef.current === null) return;
    if (dropdownRef.current.contains(e.target)) return;
    if (menuRef.current.contains(e.target)) return;
    if (!dropdownRef.current.contains(e.target)) {
      setIsOpen((cv) => (cv = false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutsideDropdown);
    };
  }, []);

  return (
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
      {isOpen && (
        <DropdownContainer ddRef={dropdownRef}>
          <p>Login</p>
          <p>Login</p>
          <p>Login</p>
          <p>Login</p>
        </DropdownContainer>
      )}
    </div>
  );
}
export default UserMenu;
