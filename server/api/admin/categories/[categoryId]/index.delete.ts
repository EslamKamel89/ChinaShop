import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role != "ADMIN") {
    createError({
      statusCode: 401,
      statusMessage: "Unathorized, you dont have ADMIN access",
    });
  }
  const categoryId = event.context.params?.categoryId;
  if (!categoryId) {
    createError({ statusCode: 404, statusMessage: "Category not found" });
    return;
  }
  const category = await db.category.delete({ where: { id: categoryId } });
  return category;
});
