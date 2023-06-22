import axios from 'axios';
import { handleErrorMessage } from '@shared/utilities';

interface ISaveReservations {
  hasError: boolean;
  data: any;
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
