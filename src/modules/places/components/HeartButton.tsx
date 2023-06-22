'use client';

import styles from '@modules/places/styles/HeartButton.module.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { type UserModel } from '@shared/models';
import { useFavorites } from '@modules/places/hooks';

interface Props {
  id: string;
  user: UserModel | null;
}

function HeartButton({ id, user }: Props): JSX.Element {
  const { hasFavorites, toggleFavorite } = useFavorites({ listingId: id, user });

  return (
    <button
      className={styles['heart-button-container']}
      type='button'
      onClick={(e) => {
        toggleFavorite(e);
      }}
    >
      <AiOutlineHeart className={`${styles.heart} ${styles['white-heart']}`} size={30} />
      <AiFillHeart
        className={`${styles.heart} ${
          hasFavorites ? styles['red-heart'] : styles['opacity-heart']
        }`}
        size={30}
      />
    </button>
  );
}
export default HeartButton;
