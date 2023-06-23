'use client';

import styles from '@shared/styles/navbar/UserMenu.module.scss';
import { MdMenu } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type UserModel } from '@shared/models';
import { signOut } from 'next-auth/react';
import { useRegisterModal, useLoginModal } from '@modules/auth/hooks';
import { useRentModal } from '@modules/places/hooks';
import { Avatar, DropdownContainer } from '@shared/components';

interface Props {
  user: UserModel | null;
}

function UserMenu({ user }: Props): JSX.Element {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { onOpen } = useLoginModal();
  const { onOpen: onRentOpen } = useRentModal();

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

  const onRent = (): void => {
    if (user === null) {
      onOpen();
    } else {
      onRentOpen();
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
          <button type='button' className={styles['']} onClick={onRent}>
            Airbnb your home
          </button>
          <button ref={menuRef} type='button' className={styles['']} onClick={handleMenu}>
            <MdMenu />
            <Avatar avatar={user?.image} />
          </button>
          <button type='button'>
            <MdMenu />
          </button>
        </div>
        {isMenuOpen && (
          <DropdownContainer ddRef={dropdownRef}>
            {user !== null ? (
              <>
                <DropdownContainer.DropdownItemModal
                  text='My Trips'
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/trips');
                  }}
                />
                <DropdownContainer.DropdownItemModal
                  text='My Favorites'
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                />
                <DropdownContainer.DropdownItemModal
                  text='My reservations'
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                />
                <DropdownContainer.DropdownItemModal
                  text='My properties'
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                />
                <DropdownContainer.DropdownItemModal
                  text='Airbnb my home'
                  onClick={() => {
                    setIsMenuOpen(false);
                    onRentOpen();
                  }}
                />
                <hr />
                <DropdownContainer.DropdownItemModal
                  text='Sign out'
                  onClick={() => {
                    signOut();
                  }}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </DropdownContainer>
        )}
      </div>
    </>
  );
}
export default UserMenu;
