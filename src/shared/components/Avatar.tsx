import styles from '../styles/Avatar.module.scss';
import NextImage from 'next/image';

interface Props {
  avatar: string | null | undefined;
  rounded?: boolean;
}

export default function Avatar({ avatar, rounded }: Props): JSX.Element {
  return (
    <NextImage
      className={`${rounded ? styles['avatar-rounded'] : ''}`}
      src={avatar ?? '/images/placeholder.jpg'}
      width={30}
      height={30}
      alt='user-avatar'
    />
  );
}
