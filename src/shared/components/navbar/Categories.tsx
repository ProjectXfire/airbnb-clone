import styles from '@shared/styles/navbar/Categories.module.scss';
import { categories } from '@/shared/utilities';
import { CategoryBox } from '@shared/components';

function Categories(): JSX.Element {
  return (
    <div className={styles.categories}>
      {categories.map((cat) => (
        <CategoryBox
          key={cat.label}
          Icon={cat.Icon}
          label={cat.label}
          description={cat.description}
        />
      ))}
    </div>
  );
}
export default Categories;
