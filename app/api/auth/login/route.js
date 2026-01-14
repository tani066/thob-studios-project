import { prisma } from "@/lib/db";
import { createToken, verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const ok = await verifyPassword(password, user.password);
  if (!ok) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createToken(user);

  const store = await cookies();
  store.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return Response.json({ message: "Logged in" });
}
