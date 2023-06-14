import styles from '@shared/styles/navbar/Logo.module.scss';
import NextImage from 'next/image';
import NextLink from 'next/link';

function Logo(): JSX.Element {
  return (
    <NextLink className={styles.logo} href='/'>
      <NextImage src='/images/logo.png' alt='logo' width='85' height='25' />
    </NextLink>
  );
}
export default Logo;
