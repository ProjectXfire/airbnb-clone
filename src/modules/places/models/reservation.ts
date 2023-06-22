import { type UserModel } from '@/shared/models';
import { type RentModel } from './rent';

export interface IReservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: UserModel;
  listing: RentModel;
}
