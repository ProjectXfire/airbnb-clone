'use client';

import { type UserModel } from '@/shared/models';
import { type RentModel } from '@modules/places/models';
import { ListingCard } from '@modules/places/components';
import { CardsContainer } from '@/shared/components';

interface Props {
  listings: RentModel[];
  user: UserModel | null;
}

function Listings({ listings, user }: Props): JSX.Element {
  return (
    <CardsContainer>
      {listings.map((item) => (
        <ListingCard key={item.id} data={item} user={user} />
      ))}
    </CardsContainer>
  );
}
export default Listings;
