import { NextResponse } from 'next/server';
import { prisma } from '@shared/libs';
import { type Listing } from '@prisma/client';
import { getCurrentUser } from '@shared/services';

interface IParams {
  id: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: IParams }
): Promise<NextResponse<Listing | string>> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json('Invalid user', { status: 401 });
    const { id } = params;
    if (!id) return NextResponse.json('Invalid reservation id', { status: 400 });
    await prisma.reservation.deleteMany({
      where: { id, OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }] }
    });
    return NextResponse.json('Reservation deleted', { status: 200 });
  } catch (error) {
    return NextResponse.json('Error save reservation', { status: 500 });
  }
}
