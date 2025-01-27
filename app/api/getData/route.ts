// app/api/getData/route.ts

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 데이터를 최신 순으로 정렬하고, 가장 최근 데이터를 가져옵니다.
    const data = await prisma.bom.findFirst({
      orderBy: {
        updatedAt: 'desc', // 최신 업데이트 날짜 기준으로 정렬
      },
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response('Error fetching data', { status: 500 });
  }
}

