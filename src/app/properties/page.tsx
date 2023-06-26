import { getCurrentUser } from '@/shared/services';
import { getListings } from '@modules/places/services';
import { Properties } from '@modules/places/components';
import { Container, Empty, Heading } from '@shared/components';

async function PropertiesPage(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <Empty title='Unauthorized' subtitle='Please sign in' />;

  const { data, error } = await getListings({ userId: currentUser.id });

  if (error) return <Empty title='Error' subtitle={error} />;

  if (data.length === 0)
    return <Empty title='No properties found' subtitle='Looks like you have no properties' />;

  return (
    <Container otherPage>
      <Heading title='Properties' subtitle='List of your properties' />
      <Properties properties={data} user={currentUser} />
    </Container>
  );
}
export default PropertiesPage;
