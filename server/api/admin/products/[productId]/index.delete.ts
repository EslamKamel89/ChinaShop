import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role != "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unathorized, you dont have ADMIN access",
    });
  }
  const productId = event.context.params?.productId;
  if (!productId) {
    throw createError({ statusCode: 404, statusMessage: "product not found" });
  }
  const product = await db.product.delete({ where: { id: productId } });
  return product;
});
