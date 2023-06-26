import { type RentModel } from '../models';
import { type UserModel } from '@/shared/models';
import { CardsContainer } from '@shared/components';
import ListingCard from './ListingCard';

interface Props {
  favorites: RentModel[];
  user: UserModel;
}

function Favorites({ favorites, user }: Props): JSX.Element {
  return (
    <section>
      <CardsContainer>
        {favorites.map((res) => (
          <ListingCard key={res.id} data={res} user={user} />
        ))}
      </CardsContainer>
    </section>
  );
}
export default Favorites;
