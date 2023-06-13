import NextImage from 'next/image';

interface Props {
  avatar: string | null | undefined;
}

export default function Avatar({ avatar }: Props): JSX.Element {
  return (
    <NextImage src={avatar ?? '/images/placeholder.jpg'} width={30} height={30} alt='user-avatar' />
  );
}
