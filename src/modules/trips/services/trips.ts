import { handleErrorMessage } from '@/shared/utilities';
import axios from 'axios';

interface IRemoveReservation {
  hasError: boolean;
  error: string | null;
}

export async function removeReservation(id: string): Promise<IRemoveReservation> {
  try {
    await axios.delete(`/api/reservations/${id}`);
    return {
      hasError: false,
      error: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      hasError: true,
      error: errorMessage
    };
  }
}
