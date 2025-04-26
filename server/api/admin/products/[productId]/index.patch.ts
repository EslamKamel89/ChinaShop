import db from "~/utils/db";
import { productSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role !== "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }
  const validated = await readValidatedBody(event, (body) => {
    return productSchema.parse(body);
  });
  const productId = event.context.params?.productId;
  if (!productId) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  const product = await db.product.update({
    where: { id: productId },
    data: { ...validated },
    include: {
      category: true,
      color: true,
      size: true,
      images: true,
    },
  });
  return product;
});
