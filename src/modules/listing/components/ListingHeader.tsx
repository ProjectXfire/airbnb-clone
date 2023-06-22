'use client';

import styles from '../styles/ListingHeader.module.scss';
import NextImage from 'next/image';
import { type UserModel } from '@shared/models';
import { useCountries } from '@shared/hooks';
import { Heading } from '@shared/components';
import { HeartButton } from '@modules/places/components';

interface Props {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  user: UserModel | null;
}

function ListingHeader({ id, imageSrc, locationValue, title, user }: Props): JSX.Element {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region ?? ''}, ${location?.label ?? ''}`} />
      <div className={styles['listingHeader-container']}>
        <NextImage alt={title} src={imageSrc} fill />
        <HeartButton user={user} id={id} />
      </div>
    </>
  );
}
export default ListingHeader;
