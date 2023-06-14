'use client';

import styles from '@shared/styles/navbar/Categories.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

import { type IconType } from 'react-icons';

interface Props {
  label: string;
  Icon: IconType;
  selected?: boolean;
}

function CategoryBox({ label, Icon, selected }: Props): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    };
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl({ url: '/', query: updatedQuery }, { skipNull: true });
    router.push(url);
  }, [label, params, router]);

  return (
    <button
      type='button'
      className={`${styles['category-box']} ${selected ? styles['is-selected'] : ''}`}
      onClick={handleClick}
    >
      <Icon size={30} />
      <span>{label}</span>
    </button>
  );
}
export default CategoryBox;
