import axios from 'axios';
import { type UserModel } from '@/shared/models';
import { handleErrorMessage } from '@/shared/utilities';

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
