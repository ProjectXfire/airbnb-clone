import axios, { type AxiosResponse } from 'axios';
import type { NewUserDto, LoginUserDto } from '@modules/auth/dtos';

export async function registerUser(payload: NewUserDto): Promise<AxiosResponse<any, any>> {
  return await axios.post('/api/register', payload);
}

export async function loginUser(payload: LoginUserDto): Promise<AxiosResponse<any, any>> {
  return await axios.post('/api/login', payload);
}
