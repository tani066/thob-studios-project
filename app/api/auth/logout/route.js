import { cookies } from "next/headers";

export async function POST() {
  const store = await cookies();
  store.delete("token");
  return Response.json({ message: "Logged out" });
}
