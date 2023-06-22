'use client';

import styles from '@modules/places/styles/CountrySelect.module.scss';
import Select from 'react-select';
import { type CountryModel } from '@modules/places/models';
import { useCountries } from '@shared/hooks';

interface Props {
  value?: CountryModel;
  onChange: (value: CountryModel) => void;
}

function CountrySelect({ value, onChange }: Props): JSX.Element {
  const { getAll } = useCountries();

  return (
    <div style={{ color: 'black' }}>
      <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => {
          onChange(value as CountryModel);
        }}
        formatGroupLabel={() => <p>el</p>}
        formatOptionLabel={(opt) => (
          <div className={styles['select-content']}>
            <div>{opt.flag}</div>
            <div>
              <span>
                <strong>{opt.label}</strong>
              </span>
              , {opt.region}
            </div>
          </div>
        )}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            padding: '8px'
          })
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'var(--box-color)',
            primary25: 'var(--secondary-color)'
          }
        })}
      />
    </div>
  );
}
export default CountrySelect;
