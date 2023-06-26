import { getCurrentUser } from '@shared/services';
import { getFavorites } from '@modules/places/services';
import { Container, Empty, Heading } from '@shared/components';
import { Favorites } from '@modules/places/components';

async function FavoritesPage(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <Empty title='Unauthorized' subtitle='Please sign in' />;

  const { data, error } = await getFavorites(currentUser.id);

  if (error) return <Empty title='Error' subtitle={error} />;

  if (data.length === 0)
    return (
      <Empty title='No favorites found' subtitle='Looks like you have no favorites listings' />
    );

  return (
    <Container otherPage>
      <Heading title='Favorites' subtitle='List of places you have favorited!' />
      <Favorites favorites={data} user={currentUser} />
    </Container>
  );
}
export default FavoritesPage;
