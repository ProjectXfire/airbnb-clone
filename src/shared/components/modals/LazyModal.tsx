import styles from '@shared/styles/modal/Modal.module.scss';
import { MdClose } from 'react-icons/md';
import { useRef } from 'react';
import Divider from '../Divider';

interface Props {
  children: JSX.Element | JSX.Element[];
  disabledActions: boolean;
  close: () => void;
  title: string;
  subtitle?: string;
}

function LazyModal({ children, disabledActions, close, title, subtitle }: Props): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  const onClose = (): void => {
    if (modalRef.current === null) return;
    modalRef.current.classList.add(styles['hide-modal']);
    setTimeout(() => {
      close();
    }, 500);
  };

  const onBackgroundClick = (): void => {
    onClose();
  };

  return (
    <>
      <div className={styles['modal-background']} onClick={onBackgroundClick} />
      <div ref={modalRef} className={styles['modal-container']}>
        <div className={styles['modal-header']}>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <Divider />
        <div className={styles['modal-content']}>{children}</div>
        <div className={styles['modal-actions']}>
          <button type='button' onClick={onClose} disabled={disabledActions}>
            <MdClose />
          </button>
        </div>
      </div>
    </>
  );
}
export default LazyModal;
