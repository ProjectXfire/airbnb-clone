import styles from '../styles/ListingCategory.module.scss';
import { type CategoryModel } from '@/shared/models';

interface Props {
  category: CategoryModel;
}

function ListingCategory({ category }: Props): JSX.Element {
  const { Icon, description, label } = category;

  return (
    <div className={styles['listingCat-container']}>
      <Icon size={40} />
      <div>
        <p>{label}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default ListingCategory;
