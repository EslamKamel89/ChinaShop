import db from "~/utils/db";
import { categorySchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session?.user && session?.user?.role != "ADMIN") {
    createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
    return;
  }
  const { name } = await readValidatedBody(event, (body) =>
    categorySchema.parse(body)
  );
  const category = await db.category.create({
    data: {
      name,
      userId: session.user.id,
    },
  });
  return { category };
});
