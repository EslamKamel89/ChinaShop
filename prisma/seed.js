import { PrismaClient } from "~/generated/prisma";
const prisma = new PrismaClient();
async function main() {
  const prisma = new PrismaClient();
  // return { message: "hello world" };
  const productsUrl = "https://fakestoreapi.com/products";
  const products = await $fetch(productsUrl);
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
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
