import { useServerStripe } from "#stripe/server";
import baseUrl from "~/utils/baseUrl";
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
  const order = await db.order.create({
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
  const stripe = await useServerStripe(event);
  const session = await stripe.checkout.sessions.create({
    line_items: products.map((product) => ({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
    })),
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${baseUrl()}/cart/?success=1`,
    cancel_url: `${baseUrl()}/cart/?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });
  return { sessionURL: session.url };
});
