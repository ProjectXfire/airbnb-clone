import { getReservations } from '@modules/listing/services';
import { getCurrentUser } from '@shared/services';
import { Empty, Container, Heading } from '@shared/components';
import { Trips } from '@modules/trips/components';

async function page(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <Empty title='Unauthorized' subtitle='Please sign in' />;

  const { data } = await getReservations({ userId: currentUser.id });

  if (data.length === 0)
    return <Empty title='No trips found' subtitle='Looks like you have not reserved any trips.' />;

  return (
    <Container otherPage>
      <Heading title='Trips' subtitle='Where you have been and where you are going?' />
      <Trips reservations={data} user={currentUser} />
    </Container>
  );
}
export default page;
