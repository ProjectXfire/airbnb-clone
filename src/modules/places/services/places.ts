import axios from 'axios';
import { type RentModel } from '@modules/places/models';
import { type CreateRentDto } from '@modules/places/dtos';
import { handleErrorMessage } from '@/shared/utilities';

interface ReturnPostValues {
  data: RentModel | null;
  error: string | null;
}

export async function saveListing(data: CreateRentDto): Promise<ReturnPostValues> {
  try {
    const res = await axios.post<RentModel>('/api/listings', data);
    return {
      data: res.data,
      error: null
    };
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      error: errorMessage
    };
  }
}
