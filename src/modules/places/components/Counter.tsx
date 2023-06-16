'use client';

import styles from '@modules/places/styles/Information.module.scss';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

interface Props {
  title: string;
  subtitle: string;
  value: number;
  valueType: string;
  onChange: (value: number, typeValue: string) => void;
}

function Counter({ title, subtitle, value, onChange, valueType }: Props): JSX.Element {
  const onAdd = (): void => {
    onChange(value + 1, valueType);
  };

  const onReduce = (): void => {
    onChange(Math.max(value - 1, 1), valueType);
  };

  return (
    <div className={styles['counter-container']}>
      <div className={styles['counter-text']}>
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
      <div className={styles.counter}>
        <button type='button' onClick={onReduce}>
          <AiFillMinusCircle size={40} />
        </button>
        <span>{value}</span>
        <button type='button' onClick={onAdd}>
          <AiFillPlusCircle size={40} />
        </button>
      </div>
    </div>
  );
}
export default Counter;
