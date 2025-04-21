import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const categories = await db.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  return categories;
});
