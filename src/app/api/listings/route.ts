import { prisma } from '@shared/libs';
import { NextResponse } from 'next/server';
import { type Listing } from '@prisma/client';
import { type CreateRentDto } from '@/modules/places/dtos';
import { getCurrentUser } from '@shared/services';

export async function GET(req: Request): Promise<NextResponse<any[] | string>> {
  try {
    const { searchParams } = new URL(req.url);
    const query: Record<string, any> = {};
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');
    const bathroomCount = searchParams.get('bathroomCount');
    const guestCount = searchParams.get('guestCount');
    const roomCount = searchParams.get('roomCount');
    const locationValue = searchParams.get('locationValue');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (locationValue) query.locationValue = locationValue;
    if (startDate && endDate)
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } }
            ]
          }
        }
      };
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      where: query
    });
    const listingsTransform = listings.map((li) => ({
      ...li,
      createdAt: li.createdAt.toISOString()
    }));
    return NextResponse.json(listingsTransform, { status: 200 });
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
