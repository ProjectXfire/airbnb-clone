import { RegisterModal, LoginModal } from '@/modules/auth/components';

export default function Home(): JSX.Element {
  return (
    <main>
      <h1>Airbnb</h1>
      <RegisterModal />
      <LoginModal />
    </main>
  );
}
