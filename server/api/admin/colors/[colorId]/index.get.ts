import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const categoryId = getRouterParam(event, "categoryId");
  const category = await db.category.findUnique({ where: { id: categoryId } });
  return category;
});
