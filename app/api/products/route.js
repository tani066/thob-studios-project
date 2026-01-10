import { prisma } from "@prisma/client";

export async function GET() {
  const products = await prisma.product.findMany();
  return Response.json(products);
}
