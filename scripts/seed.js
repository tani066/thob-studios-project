import { prisma } from "../lib/db";

async function main() {
  // Clean up database
  await prisma.order.deleteMany();
  await prisma.configuration.deleteMany();
  await prisma.option.deleteMany();
  await prisma.optionCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create User
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: "password123", // In a real app, hash this!
      role: "USER",
    },
  });

  // Create Product
  const product = await prisma.product.create({
    data: {
      name: "Running Shoe",
      basePrice: 2000,
    },
  });

  // Create Option Categories
  const colorCategory = await prisma.optionCategory.create({
    data: {
      name: "Color",
      productId: product.id,
    },
  });

  const sizeCategory = await prisma.optionCategory.create({
    data: {
      name: "Size",
      productId: product.id,
    },
  });

  // Create Options
  await prisma.option.createMany({
    data: [
      { name: "Red", priceDelta: 200, categoryId: colorCategory.id },
      { name: "Blue", priceDelta: 100, categoryId: colorCategory.id },
      { name: "7", priceDelta: 0, categoryId: sizeCategory.id },
      { name: "8", priceDelta: 100, categoryId: sizeCategory.id },
    ],
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
