import { type UserModel } from '@/shared/models';
import styles from '@shared/styles/navbar/Navbar.module.scss';
import { Categories, Container, Logo, Search, UserMenu } from '@shared/components';

interface Props {
  user: UserModel | null;
}

function Navbar({ user }: Props): JSX.Element {
  return (
    <nav className={styles.nav}>
      <Container>
        <div className={styles['nav-items']}>
          <Logo />
          <Search />
          <UserMenu user={user} />
        </div>
      </Container>
      <Container>
        <Categories />
      </Container>
    </nav>
  );
}
export default Navbar;
