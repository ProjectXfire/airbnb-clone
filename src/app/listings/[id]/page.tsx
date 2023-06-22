import { getListingById, getReservation } from '@modules/listing/services';
import { getCurrentUser } from '@shared/services';
import { Container, Empty } from '@shared/components';
import { Listing } from '@modules/listing/components';

interface IParams {
  id: string;
}

async function ListingPage({ params }: { params: IParams }): Promise<JSX.Element> {
  const listing = await getListingById(params.id);
  const currentUser = await getCurrentUser();
  const reservations = await getReservation(currentUser?.id, listing.data?.id);

  if (!listing.data) return <Empty />;

  return (
    <Container otherPage>
      <Listing listing={listing.data} user={currentUser} reservations={reservations.data} />
    </Container>
  );
}
export default ListingPage;
