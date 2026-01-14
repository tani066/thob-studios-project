import "dotenv/config";
import { prisma } from "../lib/db";
import { hashPassword } from "../lib/auth";

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
      password: await hashPassword("password123"),
      role: "USER",
    },
  });

  // --- Product 1: Running Shoe ---
  const shoe = await prisma.product.create({
    data: {
      name: "Performance Running Shoe",
      basePrice: 2000,
    },
  });

  const shoeColor = await prisma.optionCategory.create({
    data: { name: "Color", productId: shoe.id },
  });
  const shoeSize = await prisma.optionCategory.create({
    data: { name: "Size", productId: shoe.id },
  });

  await prisma.option.createMany({
    data: [
      { name: "Neon Red", priceDelta: 200, categoryId: shoeColor.id },
      { name: "Ocean Blue", priceDelta: 100, categoryId: shoeColor.id },
      { name: "Midnight Black", priceDelta: 0, categoryId: shoeColor.id },
      { name: "US 7", priceDelta: 0, categoryId: shoeSize.id },
      { name: "US 8", priceDelta: 0, categoryId: shoeSize.id },
      { name: "US 9", priceDelta: 100, categoryId: shoeSize.id },
    ],
  });

  // --- Product 2: Mechanical Keyboard ---
  const keyboard = await prisma.product.create({
    data: {
      name: "Pro Mechanical Keyboard",
      basePrice: 5000,
    },
  });

  const switchType = await prisma.optionCategory.create({
    data: { name: "Switch Type", productId: keyboard.id },
  });
  const keycaps = await prisma.optionCategory.create({
    data: { name: "Keycaps", productId: keyboard.id },
  });

  await prisma.option.createMany({
    data: [
      { name: "Cherry MX Red (Linear)", priceDelta: 0, categoryId: switchType.id },
      { name: "Cherry MX Blue (Clicky)", priceDelta: 500, categoryId: switchType.id },
      { name: "Cherry MX Brown (Tactile)", priceDelta: 300, categoryId: switchType.id },
      { name: "ABS Standard", priceDelta: 0, categoryId: keycaps.id },
      { name: "PBT Double-Shot", priceDelta: 1500, categoryId: keycaps.id },
    ],
  });

  // --- Product 3: Ergonomic Chair ---
  const chair = await prisma.product.create({
    data: {
      name: "ErgoFlow Office Chair",
      basePrice: 12000,
    },
  });

  const material = await prisma.optionCategory.create({
    data: { name: "Material", productId: chair.id },
  });
  const headrest = await prisma.optionCategory.create({
    data: { name: "Headrest", productId: chair.id },
  });

  await prisma.option.createMany({
    data: [
      { name: "Mesh", priceDelta: 0, categoryId: material.id },
      { name: "Leather", priceDelta: 3000, categoryId: material.id },
      { name: "Fabric", priceDelta: 1000, categoryId: material.id },
      { name: "No Headrest", priceDelta: 0, categoryId: headrest.id },
      { name: "Adjustable Headrest", priceDelta: 1500, categoryId: headrest.id },
    ],
  });

  // --- Product 4: Gaming Laptop ---
  const laptop = await prisma.product.create({
    data: {
      name: "BladeRunner Gaming Laptop",
      basePrice: 85000,
    },
  });

  const ram = await prisma.optionCategory.create({
    data: { name: "RAM", productId: laptop.id },
  });
  const storage = await prisma.optionCategory.create({
    data: { name: "Storage", productId: laptop.id },
  });
  const gpu = await prisma.optionCategory.create({
    data: { name: "GPU", productId: laptop.id },
  });

  await prisma.option.createMany({
    data: [
      { name: "16GB", priceDelta: 0, categoryId: ram.id },
      { name: "32GB", priceDelta: 4000, categoryId: ram.id },
      { name: "512GB SSD", priceDelta: 0, categoryId: storage.id },
      { name: "1TB SSD", priceDelta: 3000, categoryId: storage.id },
      { name: "RTX 4060", priceDelta: 0, categoryId: gpu.id },
      { name: "RTX 4070", priceDelta: 10000, categoryId: gpu.id },
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
