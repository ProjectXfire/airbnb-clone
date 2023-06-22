import styles from '@shared/styles/Container.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  mainPage?: boolean;
  otherPage?: boolean;
}

function Container({ children, mainPage, otherPage }: Props): JSX.Element {
  return (
    <div
      className={`${styles.container} ${mainPage ? styles['is-main-page'] : ''} ${
        otherPage ? styles['is-other-page'] : ''
      }`}
    >
      {children}
    </div>
  );
}
export default Container;
