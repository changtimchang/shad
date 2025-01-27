import prisma from "@/lib/prisma";

export async function GET() {
  const postCount = await prisma.bom.count();
  return new Response(JSON.stringify({ count : postCount}), {
    headers: { 'Content-type' : 'application/json'},
  })
}