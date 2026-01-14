import { getUserFromRequest } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromRequest();

  if (!user) {
    return Response.json({ user: null });
  }

  return Response.json({ user });
}
