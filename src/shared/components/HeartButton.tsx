import styles from '@shared/styles/HeartButton.module.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { type UserModel } from '../models';

interface Props {
  id: string;
  user: UserModel | null;
}

function HeartButton({ id, user }: Props): JSX.Element {
  const hasFavorites = false;
  const toggleFavorite = (): void => {};

  return (
    <button className={styles['heart-button-container']} type='button' onClick={toggleFavorite}>
      <AiOutlineHeart className={styles['white-heart']} size={30} />
      <AiFillHeart
        className={`${hasFavorites ? styles['red-heart'] : styles['opacity-heart']}`}
        size={30}
      />
    </button>
  );
}
export default HeartButton;
