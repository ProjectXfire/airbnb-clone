import { type CountryModel } from '@modules/places/models';

export interface RentModel {
  category: string;
  location: undefined | CountryModel;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}
