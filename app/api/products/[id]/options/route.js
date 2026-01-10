import { prisma } from "@prisma/client";

export async function GET(req, { params }) {
  const productId = parseInt(params.id);

  const categories = await prisma.optionCategory.findMany({
    where: { productId },
    include: { options: true },
  });

  return Response.json(categories);
}
