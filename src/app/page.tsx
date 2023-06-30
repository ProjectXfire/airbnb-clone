import { getListings } from '@/modules/places/services';
import { getCurrentUser } from '@/shared/services';
import { type IListingsParams } from '@/modules/places/models';
import { Listings } from '@/modules/places/components';
import { Container, Empty } from '@/shared/components';

interface Props {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: Props): Promise<JSX.Element> {
  const { data } = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const isEmpty = data.length === 0;
  return (
    <Container mainPage>
      {isEmpty ? <Empty showReset /> : <Listings listings={data} user={currentUser} />}
    </Container>
  );
}
