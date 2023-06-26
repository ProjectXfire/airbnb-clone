import { NextResponse } from 'next/server';
import { prisma } from '@shared/libs';
import { type Listing } from '@prisma/client';
import { getCurrentUser } from '@shared/services';

export async function POST(req: Request): Promise<NextResponse<Listing | string>> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json('Invalid user', { status: 401 });
    const body = await req.json();
    const { listingId, totalPrice, start, end } = body;
    if (!listingId || !start || !end) return NextResponse.json('Invalid data', { status: 401 });
    const listingReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: { userId: currentUser.id, startDate: start, endDate: end, totalPrice }
        }
      }
    });
    return NextResponse.json(listingReservation, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error save reservation', { status: 500 });
  }
}

export async function GET(req: Request, { params }: any): Promise<any> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const listingId = searchParams.get('listingId');
    const authorId = searchParams.get('authorId');
    const query: any = {};
    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (authorId) query.listing = { userId: authorId };
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error on get reservations', { status: 500 });
  }
}
