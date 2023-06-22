import { type UserModel } from '@/shared/models';

export interface RentModel {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  locationValue: string;
  imageSrc: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  price: number;
  createdAt: string;
  user: UserModel;
}
