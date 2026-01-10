import { prisma } from "./db";

/**
 * Calculates final price for a product based on selected options
 */
export async function calculateFinalPrice(productId, selectedOptions) {
  // 1. Fetch product with option categories & options
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      categories: {
        include: {
          options: true,
        },
      },
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  let finalPrice = product.basePrice;

  // 2. Loop through selected options
  for (const [categoryName, optionName] of Object.entries(selectedOptions)) {
    const category = product.categories.find(
      (cat) => cat.name === categoryName
    );

    if (!category) {
      throw new Error(`Invalid category: ${categoryName}`);
    }

    const option = category.options.find(
      (opt) => opt.name === optionName
    );

    if (!option) {
      throw new Error(`Invalid option: ${optionName}`);
    }

    finalPrice += option.priceDelta;
  }

  return finalPrice;
}


export async function createConfiguration(userId, productId, selectedOptions) {
  const finalPrice = await calculateFinalPrice(productId, selectedOptions);

  const config = await prisma.configuration.create({
    data: {
      userId,
      productId,
      selectedOptions,
      finalPrice,
    },
  });

  return config;
}
