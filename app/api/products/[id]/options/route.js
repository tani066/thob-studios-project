import { prisma } from "@/lib/db";

export async function GET(req, props) {
  const params = await props.params;
  const productId = parseInt(params.id);

  const categories = await prisma.optionCategory.findMany({
    where: { productId },
    include: { options: true },
  });

  return Response.json(categories);
}
