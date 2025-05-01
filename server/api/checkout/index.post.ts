import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const { ids: productIds } = await readBody<{ ids: string[] }>(event);
  if (!productIds || !productIds?.length) {
    throw createError({
      message: "Product ids are required",
      statusCode: 400,
    });
  }
  const products = await db.product.findMany({
    where: { id: { in: productIds } },
  });
  if (!products || !products.length) {
    throw createError({
      message: "Product ids are unvalid",
      statusCode: 400,
    });
  }
  const order = db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: products.map((product) => ({
          productId: product.id,
        })),
      },
    },
    include: { orderItems: { include: { product: true } } },
  });
  //! stripe session
  return order;
});
