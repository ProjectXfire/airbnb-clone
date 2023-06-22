import axios from 'axios';
import { type RentModel } from '@modules/places/models';
import { handleErrorMessage } from '@/shared/utilities';

interface ReturnListing {
  hasError: boolean;
  data: RentModel | null;
  error: string | null;
}

export async function getListingById(id: string): Promise<ReturnListing> {
  try {
    const res = await axios.get<RentModel>(`${process.env.NEXTAUTH_URL ?? ''}/api/listings/${id}`);
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
