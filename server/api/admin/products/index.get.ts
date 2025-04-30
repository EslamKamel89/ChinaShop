import { ProductFilters } from "~/types";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const { colorId, sizeId, categoryId, isArchived, isFeatured } =
    getQuery<ProductFilters>(event);
  const filters = () => {
    let result = {};
    if (colorId) result = { ...result, colorId };
    if (sizeId) result = { ...result, sizeId };
    if (categoryId) result = { ...result, categoryId };
    return result;
  };
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    where: filters(),
    include: {
      category: true,
      color: true,
      size: true,
      images: true,
    },
  });
  return products;
});
