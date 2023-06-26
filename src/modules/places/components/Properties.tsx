'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { type UserModel } from '@shared/models';
import { type RentModel } from '@modules/places/models';
import { removeListing } from '../services';
import { ListingCard } from '@modules/places/components';
import { CardsContainer } from '@shared/components';

interface Props {
  properties: RentModel[];
  user: UserModel;
}

function Properties({ properties, user }: Props): JSX.Element {
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();

  const onCancel = async (id: string): Promise<void> => {
    setDeletingId(id);
    const { hasError, error, data } = await removeListing(id);
    if (hasError) {
      toast.error(error);
    } else {
      toast.success(data);
      router.refresh();
    }
    setDeletingId('');
  };

  return (
    <section>
      <CardsContainer>
        {properties.map((listing) => (
          <ListingCard
            disabled={deletingId === listing.id}
            key={listing.id}
            data={listing}
            user={user}
            actionId={listing.id}
            onAction={(id) => {
              onCancel(id);
            }}
            actionLabel='Remove property'
          />
        ))}
      </CardsContainer>
    </section>
  );
}
export default Properties;
