'use client';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange, type RangeKeyDict, type Range } from 'react-date-range';

interface Props {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

function Calendar({ value, disabledDates, onChange }: Props): JSX.Element {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}
export default Calendar;
