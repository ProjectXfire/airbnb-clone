'use client';

import styles from '@shared/styles/navbar/Categories.module.scss';
import { useSearchParams, usePathname } from 'next/navigation';
import { categories } from '@/shared/utilities';
import { CategoryBox } from '@shared/components';

function Categories(): JSX.Element {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return <></>;

  return (
    <div className={styles.categories}>
      {categories.map((cat) => (
        <CategoryBox
          key={cat.label}
          Icon={cat.Icon}
          label={cat.label}
          selected={category === cat.label}
        />
      ))}
    </div>
  );
}
export default Categories;
