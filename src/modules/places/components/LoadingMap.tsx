'use client';

import styles from '@shared/styles/Loading.module.scss';

function LoadingMap(): JSX.Element {
  return (
    <div className={styles['lds-spinner']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
export default LoadingMap;
