'use client';

import styles from '@shared/styles/navbar/Search.module.scss';
import { CiSearch } from 'react-icons/ci';
import { useSearchModal } from '@modules/places/hooks';

function Search(): JSX.Element {
  const { onOpen } = useSearchModal();

  return (
    <button className={styles.search} type='button' onClick={onOpen}>
      <div className={`${styles['search-action']}`}>Anywhere</div>
      <span className={styles.separator} />
      <div className={`${styles['search-action']}`}>Any week</div>
      <span className={styles.separator} />
      <div
        className={`${styles['search-action']} ${styles['search-icon-lg']}  ${styles['search-icon']}`}
      >
        Add guests
        <div>
          <CiSearch />
        </div>
      </div>
      <div
        className={`${styles['search-action']} ${styles['search-icon-md']} ${styles['search-icon']}`}
      >
        Anywhere
        <div>
          <CiSearch />
        </div>
      </div>
    </button>
  );
}
export default Search;
