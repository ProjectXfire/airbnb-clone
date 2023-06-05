import { nunito } from '@/shared/utilities';
import './globals.css';

export const metadata = {
  title: 'Airbnb clone',
  description: 'Airbnb clone by Next'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
