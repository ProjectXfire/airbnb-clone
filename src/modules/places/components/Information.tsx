'use client';

import styles from '@modules/places/styles/Information.module.scss';
import { Counter } from '@modules/places/components';

interface Props {
  guestsValue: number;
  roomsValue: number;
  bathroomsValue: number;
  onChange: (value: number, typeValue: string) => void;
}

function Information({ guestsValue, roomsValue, bathroomsValue, onChange }: Props): JSX.Element {
  return (
    <div className={styles['info-container']}>
      <Counter
        title='Guest'
        subtitle='How many guest do you allow?'
        value={guestsValue}
        valueType='guestCount'
        onChange={onChange}
      />
      <Counter
        title='Rooms'
        subtitle='How many rooms do you have?'
        value={roomsValue}
        valueType='roomCount'
        onChange={onChange}
      />
      <Counter
        title='Bathrooms'
        subtitle='How many bathrooms do you have?'
        value={bathroomsValue}
        valueType='bathroomCount'
        onChange={onChange}
      />
    </div>
  );
}
export default Information;
