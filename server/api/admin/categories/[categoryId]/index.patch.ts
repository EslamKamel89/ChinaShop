import db from "~/utils/db";
import { categorySchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role !== "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }
  const { name } = await readValidatedBody(event, (body) => {
    return categorySchema.parse(body);
  });
  const categoryId = event.context.params?.categoryId;
  if (!categoryId) {
    throw createError({ statusCode: 404, statusMessage: "Category not found" });
  }
  const category = await db.category.update({
    where: { id: categoryId },
    data: { name },
  });
  return category;
});
