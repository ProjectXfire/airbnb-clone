'use client';

import styles from '../styles/Trips.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type UserModel } from '@shared/models';
import { type IReservation } from '@modules/places/models';
import { removeReservation } from '../services';
import { Heading } from '@shared/components';
import { toast } from 'react-hot-toast';
import { ListingCard } from '@modules/places/components';

interface Props {
  reservations: IReservation[];
  user: UserModel;
}

function Trips({ reservations, user }: Props): JSX.Element {
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
      <Heading title='Trips' subtitle='Where you have been and where you are going?' />
      <div className={styles['trips-list']}>
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
            actionLabel='Cancel reservation'
          />
        ))}
      </div>
    </section>
  );
}
export default Trips;
