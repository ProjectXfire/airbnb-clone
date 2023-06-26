import { prisma } from '@shared/libs';
import { type User, type Listing } from '@prisma/client';
import { getCurrentUser } from '@/shared/services';
import { NextResponse } from 'next/server';

interface IParams {
  id?: string;
}

export async function GET(
  req: Request,
  { params }: { params: IParams }
): Promise<NextResponse<Listing[] | string>> {
  try {
    const { id } = params;
    if (!id || typeof id !== 'string') return NextResponse.json('Invalid user id', { status: 400 });
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return NextResponse.json('User not exist', { status: 400 });
    const favorites = await prisma.listing.findMany({
      where: { id: { in: [...(user.favoritesIds || [])] } }
    });
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error on get favorites', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: IParams }
): Promise<NextResponse<User | string>> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json('Invalid user', { status: 400 });
    const { id } = params;
    if (!id || typeof id !== 'string')
      return NextResponse.json('Invalid listing id', { status: 400 });
    const favoritesIds = [...(currentUser.favoritesIds || [])];
    favoritesIds.push(id);
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoritesIds }
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error on update', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: IParams }
): Promise<NextResponse<User | string>> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json('Invalid user', { status: 400 });
    const { id } = params;
    if (!id || typeof id !== 'string')
      return NextResponse.json('Invalid listing id', { status: 400 });
    const favoritesIds = currentUser.favoritesIds.filter((favId) => favId !== id);
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoritesIds }
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error on delete', { status: 500 });
  }
}
