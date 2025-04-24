import db from "~/utils/db";
import { productSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session?.user && session?.user?.role != "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }
  const validated = await readValidatedBody(event, (body) =>
    productSchema.parse(body)
  );
  const product = await db.product.create({
    data: {
      ...validated,
      userId: session.user.id,
    },
  });
  return { product };
});
