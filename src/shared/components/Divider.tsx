'use client';

import styles from '@shared/styles/Divider.module.scss';

interface Props {
  noSpace?: boolean;
}

function Divider({ noSpace }: Props): JSX.Element {
  return <div className={`${styles.divider} ${noSpace ? '' : styles['divider-margin']}`} />;
}
export default Divider;
