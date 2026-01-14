import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return Response.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      name: name || email.split("@")[0],
      password: hashed,
    },
  });

  return Response.json({ message: "Signed up. Please login." }, { status: 201 });
}
