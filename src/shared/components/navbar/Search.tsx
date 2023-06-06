'use client';

import { CiSearch } from 'react-icons/ci';
import styles from '@shared/styles/navbar/Search.module.scss';

function Search(): JSX.Element {
  return (
    <div className={styles.search}>
      <button className={`${styles['search-action']}`} type='button'>
        Anywhere
      </button>
      <span className={styles.separator} />
      <button className={`${styles['search-action']}`} type='button'>
        Any week
      </button>
      <span className={styles.separator} />
      <button
        type='button'
        className={`${styles['search-action']} ${styles['search-icon-lg']}  ${styles['search-icon']}`}
      >
        Add guests
        <div>
          <CiSearch />
        </div>
      </button>
      <button
        type='button'
        className={`${styles['search-action']} ${styles['search-icon-md']} ${styles['search-icon']}`}
      >
        Anywhere
        <div>
          <CiSearch />
        </div>
      </button>
    </div>
  );
}
export default Search;
