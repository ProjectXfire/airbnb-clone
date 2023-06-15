import countries from 'world-countries';
import { type CountryModel } from '@modules/places/models';

const formattedCountries: CountryModel[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}));

interface ReturnValues {
  getAll: () => CountryModel[];
  getByValue: (value: string) => CountryModel | undefined;
}

function useCountries(): ReturnValues {
  const getAll = (): CountryModel[] => formattedCountries;
  const getByValue = (value: string): CountryModel | undefined =>
    formattedCountries.find((fc) => fc.value === value);

  return {
    getAll,
    getByValue
  };
}

export default useCountries;
