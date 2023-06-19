import { getListings } from '@/modules/places/services';
import { getCurrentUser } from '@/shared/services';
import { Listings } from '@/modules/places/components';
import { Empty } from '@/shared/components';

export default async function Home(): Promise<JSX.Element> {
  const { data } = await getListings();
  const currentUser = await getCurrentUser();

  const isEmpty = data.length === 0;

  return (
    <section>
      {isEmpty ? <Empty showReset /> : <Listings listings={data} user={currentUser} />}
    </section>
  );
}
