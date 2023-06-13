import { type UserModel } from '@/shared/models';
import type { NewUserDto, LoginUserDto } from '@modules/auth/dtos';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { handleErrorMessage } from '@/shared/utilities';

interface Response {
  error: null | string;
  data: null | UserModel;
}

export async function loginUser(payload: LoginUserDto): Promise<Response> {
  const res = await signIn('credentials', { ...payload, redirect: false });
  if (res?.error) {
    return {
      data: null,
      error: res.error
    };
  }
  return {
    data: null,
    error: null
  };
}

export async function signInWithGoogle(): Promise<Response> {
  const res = await signIn('google', {});
  if (res?.error) {
    return {
      data: null,
      error: res.error
    };
  }
  return {
    data: null,
    error: null
  };
}

export async function signInWithGithub(): Promise<Response> {
  const res = await signIn('github');
  if (res?.error) {
    return {
      data: null,
      error: res.error
    };
  }
  return {
    data: null,
    error: null
  };
}

export async function registerUser(payload: NewUserDto): Promise<Response> {
  try {
    const res = await axios.post<UserModel>('/api/auth/register', payload);
    return {
      error: null,
      data: res.data
    };
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);
    return {
      error: errorMessage,
      data: null
    };
  }
}
