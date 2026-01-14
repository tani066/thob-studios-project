import { calculateFinalPrice } from "@/lib/pricing";

export async function POST(req) {
  const body = await req.json();
  const { productId, selectedOptions } = body;

  if (!productId || !selectedOptions) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const finalPrice = await calculateFinalPrice(productId, selectedOptions);
    return Response.json({ finalPrice }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
