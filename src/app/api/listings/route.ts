import { prisma } from '@shared/libs';
import { NextResponse } from 'next/server';
import { type Listing } from '@prisma/client';
import { type CreateRentDto } from '@/modules/places/dtos';
import { getCurrentUser } from '@/shared/services';

export async function GET(req: Request): Promise<NextResponse<Listing[] | string>> {
  try {
    const listings = await prisma.listing.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error on get data', { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse<Listing | string>> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json('Invalid user', { status: 401 });
    const body = (await req.json()) as CreateRentDto;
    const {
      title,
      description,
      imageSrc,
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      price
    } = body;
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        guestCount,
        roomCount,
        bathroomCount,
        price,
        locationValue: location ? location.value : '',
        userId: currentUser.id
      }
    });
    return NextResponse.json(listing, { status: 201 });
  } catch (e) {
    return NextResponse.json('Error on register', { status: 500 });
  }
}
