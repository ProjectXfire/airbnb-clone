'use client';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function ClientComponents({ children }: Props): JSX.Element {
  return <>{children}</>;
}
export default ClientComponents;
