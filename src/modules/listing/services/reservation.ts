import axios from 'axios';
import { handleErrorMessage } from '@shared/utilities';
import { type IReservation } from '@modules/places/models';

interface ISaveReservations {
  hasError: boolean;
  data: any;
  error: string | null;
}

interface IGetReservations {
  hasError: boolean;
  data: IReservation[];
  error: string | null;
}

export async function saveReservations(
  totalPrice: number,
  start: Date,
  end: Date,
  listingId?: string
): Promise<ISaveReservations> {
  try {
    const res = await axios.post(`${process.env.NEXTAUTH_URL ?? ''}/api/reservations`, {
      listingId,
      totalPrice,
      start,
      end
    });
    return {
      hasError: false,
      data: res.data,
      error: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      hasError: true,
      data: null,
      error: errorMessage
    };
  }
}

export async function getReservation(
  userId?: string,
  listingId?: string,
  authorId?: string
): Promise<IGetReservations> {
  try {
    const queries = [];
    if (userId) queries.push(`userId=${userId}`);
    if (listingId) queries.push(`listingId=${listingId}`);
    if (authorId) queries.push(`authorId=${authorId}`);
    const getQuery = queries.join('&');
    const res = await axios.get<IReservation[]>(
      `${process.env.NEXTAUTH_URL ?? ''}/api/reservations?${getQuery}`
    );
    return {
      hasError: false,
      data: res.data,
      error: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      hasError: true,
      data: [],
      error: errorMessage
    };
  }
}
