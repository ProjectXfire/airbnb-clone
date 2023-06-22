import { prisma } from '@shared/libs';
import { NextResponse } from 'next/server';

interface IParams {
  id?: string;
}

export async function GET(
  req: Request,
  { params }: { params: IParams }
): Promise<NextResponse<any | string>> {
  try {
    const { id } = params;
    if (!id || typeof id !== 'string')
      return NextResponse.json('Invalid listing id', { status: 400 });
    const listing = await prisma.listing.findUnique({ where: { id }, include: { user: true } });
    if (!listing) return NextResponse.json('No listing found', { status: 400 });
    const listingTransform = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        id: listing.user.id,
        name: listing.user.name,
        email: listing.user.email,
        image: listing.user.image,
        favoritesIds: listing.user.favoritesIds
      }
    };
    return NextResponse.json(listingTransform, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error on get listing', { status: 500 });
  }
}
