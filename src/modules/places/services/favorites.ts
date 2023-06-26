import axios from 'axios';
import { type UserModel } from '@shared/models';
import { type RentModel } from '../models';
import { handleErrorMessage } from '@/shared/utilities';

interface IGetFavorites<T> {
  error: string | null;
  data: T;
}

export async function getFavorites(id: string): Promise<IGetFavorites<RentModel[]>> {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL ?? ''}/api/favorites/${id}`);
    return {
      error: null,
      data: res.data
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      error: errorMessage,
      data: []
    };
  }
}

export async function addToFAvorite(listingid: string): Promise<UserModel> {
  try {
    const res = await axios.post<UserModel>(`/api/favorites/${listingid}`);
    return res.data;
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    throw new Error(errorMessage);
  }
}

export async function removeFavorite(listingid: string): Promise<UserModel> {
  try {
    const res = await axios.delete<UserModel>(`/api/favorites/${listingid}`);
    return res.data;
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    throw new Error(errorMessage);
  }
}
