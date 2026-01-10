import { prisma } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const { userId, configurationId, totalPrice } = body;

  if (!userId || !configurationId || !totalPrice) {
    console.log(userId, configurationId, totalPrice);
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const order = await prisma.order.create({
    data: {
      userId,
      configurationId,
      totalPrice,
    },
  });

  return Response.json(order, { status: 201 });
}
