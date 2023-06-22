import styles from '@shared/styles/Heading.module.scss';

interface Props {
  title: string;
  subtitle: string;
}

function Heading({ title, subtitle }: Props): JSX.Element {
  return (
    <div className={styles['heading-container']}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
export default Heading;
