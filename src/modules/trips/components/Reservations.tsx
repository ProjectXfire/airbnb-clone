'use client';

import { useRouter } from 'next/navigation';
import { type IReservation } from '@modules/places/models';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { type UserModel } from '@shared/models';
import { removeReservation } from '../services';
import { CardsContainer } from '@/shared/components';
import { ListingCard } from '@modules/places/components';

interface Props {
  user: UserModel;
  reservations: IReservation[];
}

function Reservations({ user, reservations }: Props): JSX.Element {
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();

  const onCancel = async (id: string): Promise<void> => {
    setDeletingId(id);
    const { hasError, error } = await removeReservation(id);
    if (hasError) {
      toast.error(error);
    } else {
      toast.success('Reservation cancelled');
      router.refresh();
    }
    setDeletingId('');
  };

  return (
    <section>
      <CardsContainer>
        {reservations.map((res) => (
          <ListingCard
            disabled={deletingId === res.id}
            key={res.id}
            data={res.listing}
            reservation={res}
            user={user}
            actionId={res.id}
            onAction={(id) => {
              onCancel(id);
            }}
            actionLabel='Cancel guest reservation'
          />
        ))}
      </CardsContainer>
    </section>
  );
}
export default Reservations;
