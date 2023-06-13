import * as bcrypt from 'bcrypt';
import { type User } from 'next-auth';
import { prisma } from '@shared/libs';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(req: Request): Promise<NextResponse<User | string>> {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: { name, email, hashedPassword }
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002')
        return NextResponse.json('Email is already registered.', { status: 500 });
    }
    return NextResponse.json('Error on register', { status: 500 });
  }
}
