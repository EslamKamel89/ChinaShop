import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      color: true,
      size: true,
      images: true,
    },
  });
  return products;
});
