import styles from '@shared/styles/Loading.module.scss';

function Loading(): JSX.Element {
  return (
    <>
      <div className={styles['loading-container']} />
      <div className={styles.loading}>
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
      </div>
    </>
  );
}
export default Loading;
