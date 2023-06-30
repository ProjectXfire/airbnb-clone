import './globals.css';
import { nunito } from '@/shared/utilities';
import { ToasterProvider } from '@shared/providers';
import { getCurrentUser } from '@shared/services';
import { Navbar } from '@shared/components';
import { RegisterModal, LoginModal } from '@modules/auth/components';
import { RentModal, SearchModal } from '@modules/places/components';

export const metadata = {
  title: 'Airbnb clone',
  description: 'Airbnb clone by Next'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar user={currentUser} />
        {children}
      </body>
    </html>
  );
}
