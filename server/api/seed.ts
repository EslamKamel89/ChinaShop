import type { Product } from "~/generated/prisma";
import { PrismaClient } from "~/generated/prisma";

export default defineEventHandler(async (_e) => {
  // const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  // return { message: "hello world" };
  const productsUrl = "https://fakestoreapi.com/products";
  const products = await $fetch<Product[]>(productsUrl);
  products.forEach(async (product) => {
    await prisma.product.create({
      data: {
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      },
    });
  });
  const newProducts = await prisma.product.findMany();
  return { newProducts };
});
