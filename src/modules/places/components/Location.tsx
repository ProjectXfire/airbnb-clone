'use client';

import styles from '@modules/places/styles/Location.module.scss';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { CountrySelect, LoadingMap } from '@modules/places/components';
import { type CountryModel } from '@modules/places/models';

interface Props {
  value?: CountryModel;
  onChange: (value: CountryModel) => void;
  center?: number[];
}

function Location({ value, onChange, center }: Props): JSX.Element {
  const Map = useMemo(
    () =>
      dynamic(async () => await import('./Map'), {
        ssr: false,
        loading: () => (
          <div className={styles['map-loading']}>
            <LoadingMap />
          </div>
        )
      }),
    [center]
  );

  return (
    <div className={styles.location}>
      <CountrySelect value={value} onChange={onChange} />
      <Map center={center} />
    </div>
  );
}
export default Location;
