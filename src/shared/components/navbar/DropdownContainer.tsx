'use client';

import { type RefObject } from 'react';
import styles from '@shared/styles/navbar/DropdownContainer.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  ddRef: RefObject<HTMLDivElement>;
}

function DropdownContainer({ children, ddRef }: Props): JSX.Element {
  return (
    <div ref={ddRef} className={styles['dropdown-container']}>
      {children}
    </div>
  );
}
export default DropdownContainer;
