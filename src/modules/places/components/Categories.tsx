'use client';

import styles from '@modules/places/styles/Categories.module.scss';
import { type CategoryModel } from '@shared/models';
import CategoryInput from './CategoryInput';

interface Props {
  categories: CategoryModel[];
  categorySelected: string;
  onClick?: (value: string) => void;
}

function Categories({ categories, categorySelected, onClick }: Props): JSX.Element {
  return (
    <div className={styles['categories-container']}>
      {categories.map((cat) => (
        <CategoryInput
          key={cat.label}
          label={cat.label}
          Icon={cat.Icon}
          onClick={(cat) => {
            if (onClick) onClick(cat);
          }}
          selected={categorySelected === cat.label}
        />
      ))}
    </div>
  );
}
export default Categories;
