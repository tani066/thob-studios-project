import { createConfiguration } from "@/lib/pricing";

export async function POST(req) {
  const body = await req.json();
  const { userId, productId, selectedOptions } = body;

  if (!userId || !productId || !selectedOptions) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const config = await createConfiguration(
      userId,
      productId,
      selectedOptions
    );

    return Response.json(config, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
