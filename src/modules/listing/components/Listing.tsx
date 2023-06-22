'use client';

import styles from '../styles/Listing.module.scss';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { type RentModel, type IReservation } from '@/modules/places/models';
import { categories } from '@shared/utilities';
import { type DateRange, type UserModel } from '@shared/models';
import { saveReservations } from '../services';
import { useLoginModal } from '@modules/auth/hooks';
import ListingHeader from './ListingHeader';
import ListingInfo from './ListingInfo';
import ListingReservation from './ListingReservation';

const initialDateRange: DateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface Props {
  reservations?: IReservation[];
  listing: RentModel;
  user: UserModel | null;
}

function Listing({ listing, user, reservations = [] }: Props): JSX.Element {
  const { id, locationValue, imageSrc, title, description, roomCount, guestCount, bathroomCount } =
    listing;
  const { onOpen } = useLoginModal();
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const category = useMemo(() => {
    const cat = categories.find((cat) => cat.label === listing.category);
    if (!cat) return null;
    return cat;
  }, [listing.category]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((res) => {
      const range = eachDayOfInterval({
        start: new Date(res.startDate),
        end: new Date(res.endDate)
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const onCreateReservation = async (): Promise<void> => {
    if (!user) {
      onOpen();
      return;
    }
    setLoading(true);
    const { hasError, error } = await saveReservations(
      totalPrice,
      dateRange.startDate,
      dateRange.endDate
    );
    if (hasError) {
      toast.error(error);
    } else {
      toast.success('Listing reserved!');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <section className={styles['listing-container']}>
      <ListingHeader
        id={id}
        user={user}
        imageSrc={imageSrc}
        locationValue={locationValue}
        title={title}
      />
      <div className={styles['listing-content']}>
        <ListingInfo
          user={user}
          category={category}
          description={description}
          roomCount={roomCount}
          guestCount={guestCount}
          bathroomCount={bathroomCount}
          locationValue={locationValue}
        />
        <ListingReservation
          totalPrice={totalPrice}
          price={listing.price}
          dateRange={dateRange}
          onChangeDate={(value) => {
            setDateRange(value as DateRange);
          }}
          onSubmit={() => {
            onCreateReservation();
          }}
          disabled={loading}
          disabledDates={disabledDates}
        />
      </div>
    </section>
  );
}
export default Listing;
