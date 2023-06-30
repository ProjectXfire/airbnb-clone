import axios from 'axios';
import { type IListingsParams, type RentModel } from '@modules/places/models';
import { type CreateRentDto } from '@modules/places/dtos';
import { handleErrorMessage } from '@/shared/utilities';

interface ReturnValue<T> {
  hasError: boolean;
  data: T;
  error: string | null;
}

export async function getListings(params?: IListingsParams): Promise<ReturnValue<RentModel[]>> {
  try {
    if (params && Object.keys(params).length > 0) {
      const setQueries = [];
      const {
        userId,
        category,
        bathroomCount,
        guestCount,
        roomCount,
        locationValue,
        endDate,
        startDate
      } = params;
      if (userId) setQueries.push(`userId=${userId}`);
      if (category) setQueries.push(`category=${category}`);
      if (bathroomCount) setQueries.push(`bathroomCount=${bathroomCount}`);
      if (guestCount) setQueries.push(`guestCount=${guestCount}`);
      if (roomCount) setQueries.push(`roomCount=${roomCount}`);
      if (locationValue) setQueries.push(`locationValue=${locationValue}`);
      if (endDate) setQueries.push(`endDate=${endDate}`);
      if (startDate) setQueries.push(`startDate=${startDate}`);
      const query = setQueries.join('&');
      const res = await axios.get<RentModel[]>(
        `${process.env.NEXTAUTH_URL ?? ''}/api/listings?${query}`
      );
      return {
        hasError: false,
        data: res.data,
        error: null
      };
    }
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

export async function saveListing(data: CreateRentDto): Promise<ReturnValue<RentModel | null>> {
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

export async function removeListing(id: string): Promise<ReturnValue<string | null>> {
  try {
    await axios.delete(`/api/listings/${id}`);
    return {
      hasError: false,
      data: 'Successfully property removed',
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
