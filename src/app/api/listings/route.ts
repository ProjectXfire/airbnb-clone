import { prisma } from '@shared/libs';
import { NextResponse } from 'next/server';
import { type Listing, Prisma } from '@prisma/client';
import { type CreateRentDto } from '@/modules/places/dtos';
import { getCurrentUser } from '@/shared/services';

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
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002')
        return NextResponse.json('Email is already registered.', { status: 400 });
    }
    return NextResponse.json('Error on register', { status: 500 });
  }
}
