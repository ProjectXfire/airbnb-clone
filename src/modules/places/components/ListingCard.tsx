'use client';

import styles from '@modules/places/styles/ListingCard.module.scss';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { format } from 'date-fns';
import { useMemo, type MouseEvent } from 'react';
import { type UserModel } from '@shared/models';
import { type IReservation, type RentModel } from '../models';
import { useCountries } from '@shared/hooks';
import { Button } from '@shared/components';
import { HeartButton } from '@modules/places/components';

interface Props {
  data: RentModel;
  user: UserModel | null;
  disabled?: boolean;
  reservation?: IReservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
}

function ListingCard({
  data,
  user,
  actionId = '',
  actionLabel,
  disabled,
  onAction,
  reservation
}: Props): JSX.Element {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (disabled) return;
    onAction?.(actionId);
  };

  const navigateToListing = (): void => {
    router.push(`/listings/${data.id}`);
  };

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return data.price;
  }, [reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <li className={styles['listing-card-container']} onClick={navigateToListing}>
      <div className={styles['listing-card-container__img']}>
        <NextImage alt={data.title} src={data.imageSrc} fill />
      </div>
      <div className={styles['listing-card-container__action-button']}>
        <HeartButton id={data.id} user={user} />
      </div>
      <div className={styles['listing-card-container__text']}>
        <p>
          {location?.region}, {location?.label}
        </p>
        <p>{reservationDate ?? data.category}</p>
        <div className={styles['price-text']}>
          <p>$ {price}</p>
          {!reservation && <p>night</p>}
        </div>
      </div>
      {actionLabel && onAction && (
        <Button
          outline
          disabled={disabled}
          type='button'
          text={actionLabel}
          onClick={handleCancel}
        />
      )}
    </li>
  );
}
export default ListingCard;
