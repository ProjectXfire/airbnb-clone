import axios from 'axios';
import { type RentModel } from '@modules/places/models';
import { type Listing } from '@prisma/client';
import { type CreateRentDto } from '@modules/places/dtos';
import { handleErrorMessage } from '@/shared/utilities';

interface ReturnPostValues {
  data: RentModel | null;
  error: string | null;
}

interface ReturnGetValues {
  data: Listing[];
  error: string | null;
}

export async function getListings(): Promise<ReturnGetValues> {
  try {
    const listings = await prisma?.listing.findMany({ orderBy: { createdAt: 'desc' } });
    return {
      data: listings ?? [],
      error: null
    };
  } catch (error: any) {
    return {
      data: [],
      error: 'Opsss, something get wrong!'
    };
  }
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
