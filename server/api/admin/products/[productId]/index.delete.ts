import { deleteServerFile } from "~/server/utils/deleteServerFile";
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
  const productImages = await db.image.findMany({
    where: { productId: productId },
  });
  const product = await db.product.delete({ where: { id: productId } });
  productImages.forEach(async (img) => {
    await deleteServerFile(img.url, "products");
  });
  return product;
});
