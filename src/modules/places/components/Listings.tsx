'use client';

import styles from '@modules/places/styles/Listings.module.scss';
import { type UserModel } from '@/shared/models';
import { type RentModel } from '@modules/places/models';
import { ListingCard } from '@modules/places/components';

interface Props {
  listings: RentModel[];
  user: UserModel | null;
}

function Listings({ listings, user }: Props): JSX.Element {
  return (
    <ul className={styles['listings-container']}>
      {listings.map((item) => (
        <ListingCard key={item.id} data={item} user={user} />
      ))}
    </ul>
  );
}
export default Listings;
