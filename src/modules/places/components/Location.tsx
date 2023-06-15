'use client';

import { CountrySelect, Map } from '@modules/places/components';
import { type CountryModel } from '@modules/places/models';

interface Props {
  value?: CountryModel;
  onChange: (value: CountryModel) => void;
}

function Location({ value, onChange }: Props): JSX.Element {
  return (
    <div>
      <CountrySelect value={value} onChange={onChange} />
      <Map />
    </div>
  );
}
export default Location;
