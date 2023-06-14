import styles from '@shared/styles/navbar/Categories.module.scss';

import { type IconType } from 'react-icons';

interface Props {
  label: string;
  Icon: IconType;
  description: string;
}

function CategoryBox({ label, Icon, description }: Props): JSX.Element {
  return (
    <div className={styles['category-box']}>
      <Icon size={30} />
      <span>{label}</span>
    </div>
  );
}
export default CategoryBox;
