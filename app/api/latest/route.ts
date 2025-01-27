import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const latestData = await prisma.bom.findFirst({
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
      },
    });

    if (!latestData) {
      return NextResponse.json(
        { message: '데이터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: latestData });
  } catch (error) {
    console.error('데이터 조회 중 에러 발생:', error);
    return NextResponse.json(
      { message: '서버 에러가 발생했습니다.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}