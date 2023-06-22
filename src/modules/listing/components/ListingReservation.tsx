'use client';

import styles from '../styles/ListingReservation.module.scss';
import { type Range } from 'react-date-range';
import { Calendar } from '@modules/places/components';
import { Button, Divider } from '@shared/components';

interface Props {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

function ListingReservation({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}: Props): JSX.Element {
  return (
    <div className={styles['listingReservation-container']}>
      <p>
        <strong>$ {price}</strong> night
      </p>
      <div className={styles['listingReservation-container__calendar']}>
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => {
            onChangeDate(value.selection);
          }}
        />
      </div>
      <Divider noSpace />
      <Button text='Reserve' disabled={disabled} outline type='button' onClick={onSubmit} />
      <div className={styles['listingReservation-container__totalPrice']}>
        <p>
          <strong>Total</strong>
        </p>
        <p>
          <strong>$ {totalPrice}</strong>
        </p>
      </div>
    </div>
  );
}
export default ListingReservation;
