'use client';

import styles from '../styles/ListingInfo.module.scss';
import dynamic from 'next/dynamic';
import { type CategoryModel, type UserModel } from '@shared/models';
import { useCountries } from '@shared/hooks';
import { Avatar, Divider } from '@shared/components';
import ListingCategory from './ListingCategory';
import { LoadingMap } from '@modules/places/components';

interface Props {
  user: UserModel | null;
  category: CategoryModel | null;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
}

function ListingInfo({
  user,
  description,
  category,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue
}: Props): JSX.Element {
  const { getByValue } = useCountries();
  const coords = getByValue(locationValue);
  const Map = dynamic(async () => await import('../../places/components/Map'), {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '35vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <LoadingMap />
      </div>
    )
  });

  return (
    <div className={styles['listingInfo-container']}>
      <div className={styles['listingInfo-container__host']}>
        <p>Hosted by {user?.name}</p>
        <Avatar rounded avatar={user?.image} />
      </div>
      <div className={styles['listingInfo-container__rooms']}>
        <p>{guestCount === 1 ? `${guestCount} guest` : `${guestCount} guests`}</p>
        <p>{bathroomCount === 1 ? `${bathroomCount} bathroom` : `${bathroomCount} bathrooms`}</p>
        <p>{roomCount === 1 ? `${roomCount} room` : `${roomCount} rooms`}</p>
      </div>
      <Divider />
      {category && <ListingCategory category={category} />}
      <Divider />
      <p>{description}</p>
      <Divider />
      <Map center={coords?.latlng} />
    </div>
  );
}
export default ListingInfo;
