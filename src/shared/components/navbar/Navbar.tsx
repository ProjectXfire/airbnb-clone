import styles from '@shared/styles/navbar/Navbar.module.scss';
import { Container, Logo, Search, UserMenu } from '@shared/components';

function Navbar(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <Container>
        <div className={styles['nav-items']}>
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
