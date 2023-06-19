import styles from '@modules/places/styles/Listings.module.scss';
import { type Listing } from '@prisma/client';
import { type UserModel } from '@/shared/models';
import { ListingCard } from '@modules/places/components';

interface Props {
  listings: Listing[];
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
