import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "productId");

  const product = await db.product.findUnique({
    where: { id: productId },
    include: { category: true, color: true, size: true, images: true },
  });
  return product;
});
