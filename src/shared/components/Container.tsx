'use client';

import styles from '@shared/styles/Container.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Container({ children }: Props): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
export default Container;
