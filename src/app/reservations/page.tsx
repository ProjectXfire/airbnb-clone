import { getCurrentUser } from '@shared/services';
import { getReservations } from '@modules/listing/services';
import { Container, Empty, Heading } from '@shared/components';
import { Reservations } from '@modules/trips/components';

async function ReservationsPage(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <Empty title='Unauthorized' subtitle='Please sign in' />;

  const { data, error } = await getReservations({ authorId: currentUser.id });

  if (error) return <Empty title='Error' subtitle={error} />;

  if (data.length === 0)
    return (
      <Empty
        title='No reservations found'
        subtitle='Looks like you have no reservations on your properties'
      />
    );

  return (
    <Container otherPage>
      <Heading title='Reservations' subtitle='Booking on your properties' />
      <Reservations user={currentUser} reservations={data} />
    </Container>
  );
}
export default ReservationsPage;
