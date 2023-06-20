import { prisma } from '@shared/libs';
import { type User } from '@prisma/client';
import { getCurrentUser } from '@/shared/services';
import { NextResponse } from 'next/server';

interface IParams {
  listingid?: string;
}

export async function POST(
  req: Request,
  { params }: { params: IParams }
): Promise<NextResponse<User | string>> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json('Invalid user', { status: 400 });
    const { listingid } = params;
    if (!listingid || typeof listingid !== 'string')
      return NextResponse.json('Invalid listing id', { status: 400 });
    const favoritesIds = [...(currentUser.favoritesIds || [])];
    favoritesIds.push(listingid);
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
    const { listingid } = params;
    if (!listingid || typeof listingid !== 'string')
      return NextResponse.json('Invalid listing id', { status: 400 });
    const favoritesIds = currentUser.favoritesIds.filter((favId) => favId !== listingid);
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoritesIds }
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error on delete', { status: 500 });
  }
}
