import axios from 'axios';
import { type RentModel } from '@modules/places/models';
import { type CreateRentDto } from '@modules/places/dtos';
import { handleErrorMessage } from '@/shared/utilities';

interface ReturnListings {
  hasError: boolean;
  data: RentModel[];
  error: string | null;
}

interface ReturnListing {
  hasError: boolean;
  data: RentModel | null;
  error: string | null;
}

export async function getListings(): Promise<ReturnListings> {
  try {
    const res = await axios.get<RentModel[]>(`${process.env.NEXTAUTH_URL ?? ''}/api/listings`);
    return {
      hasError: false,
      data: res.data,
      error: null
    };
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);
    return {
      hasError: true,
      data: [],
      error: errorMessage
    };
  }
}

export async function saveListing(data: CreateRentDto): Promise<ReturnListing> {
  try {
    const res = await axios.post<RentModel>('/api/listings', data);
    return {
      hasError: false,
      data: res.data,
      error: null
    };
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);
    return {
      hasError: true,
      data: null,
      error: errorMessage
    };
  }
}
