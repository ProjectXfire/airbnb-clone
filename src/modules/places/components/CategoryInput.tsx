'use client';

import styles from '@modules/places/styles/Categories.module.scss';
import { type IconType } from 'react-icons';

interface Props {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  Icon: IconType;
}

function CategoryInput({ label, Icon, onClick, selected }: Props): JSX.Element {
  const onSelect = (): void => {
    onClick(label);
  };

  return (
    <button
      className={`${styles.category} ${selected ? styles['is-selected'] : ''}`}
      type='button'
      onClick={onSelect}
    >
      <Icon size={30} />
      <span>{label}</span>
    </button>
  );
}
export default CategoryInput;
