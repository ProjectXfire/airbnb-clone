'use client';

import styles from '@shared/styles/Empty.module.scss';
import { useRouter } from 'next/navigation';
import { Button } from '@shared/components';

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

function EmptyListings({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some filters',
  showReset
}: Props): JSX.Element {
  const router = useRouter();

  return (
    <div className={styles['empty-container']}>
      <div>
        <p>{title}</p>
        <p>{subtitle}</p>
        {showReset && (
          <Button
            type='button'
            text='Remove all filters'
            onClick={() => {
              router.push('/');
            }}
          />
        )}
      </div>
    </div>
  );
}
export default EmptyListings;
