import './globals.css';
import { nunito } from '@/shared/utilities';
import { Navbar } from '@/shared/components';
import { ToasterProvider } from '@/shared/providers';

export const metadata = {
  title: 'Airbnb clone',
  description: 'Airbnb clone by Next'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <ToasterProvider />
        <Navbar /> {children}
      </body>
    </html>
  );
}
