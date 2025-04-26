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
  const body = await readBody(event);
  const images = () => {
    const imgs = (body.images as { url: string }[] | null | undefined) ?? [];
    return imgs.map((img) => ({
      url: img.url,
    }));
  };
  const validated = await readValidatedBody(event, (body) => {
    return productSchema.parse(body);
  });
  const productId = event.context.params?.productId;
  if (!productId) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  await db.product.update({
    where: { id: productId },
    data: { ...validated, images: { deleteMany: {} } },
  });
  const product = await db.product.update({
    where: { id: productId },
    data: images().length
      ? {
          images: {
            createMany: {
              data: images(),
            },
          },
        }
      : {},
    include: {
      category: true,
      color: true,
      size: true,
      images: true,
    },
  });
  return product;
});
