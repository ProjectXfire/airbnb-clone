import { type Session } from 'next-auth';
import { type UserModel } from '@shared/models';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@shared/libs';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<null | UserModel> {
  try {
    const session = await getSession();
    if (session === null || !session.user || !session.user.email) return null;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true, image: true, favoritesIds: true }
    });
    if (currentUser === null) return null;
    const user: UserModel = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      image: currentUser.image,
      favoritesIds: currentUser.favoritesIds
    };
    return user;
  } catch (error) {
    return null;
  }
}
