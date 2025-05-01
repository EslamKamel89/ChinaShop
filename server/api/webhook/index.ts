import { useServerStripe } from "#stripe/server";
import { Stripe } from "stripe";
import db from "~/utils/db";
import pr from "~/utils/pr";
export default defineEventHandler(async (event) => {
  pr("Custom Web hook");
  const stripe = await useServerStripe(event);
  const signature = (await getHeader(event, "stripe-signature")) as string;
  const body = await readRawBody(event);
  const parsedBody = await readBody(event);
  if (body == null) {
    throw createError({
      message: "Unknown error occured",
      statusCode: 400,
    });
  }
  let stripeEvent: Stripe.Event;
  pr(body, "Body");
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      useRuntimeConfig().stripeWebHookSecret
    );
  } catch (error) {
    pr(error, "error");
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid Signature",
    });
  }
  const session = stripeEvent.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;
  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];
  const addressStr = addressComponents.filter((val) => val != null).join(", ");
  if (stripeEvent.type == "checkout.session.completed") {
    const order = await db.order.update({
      where: { id: parsedBody.metadata?.orderId ?? "" },
      data: {
        isPaid: true,
        address: addressStr,
        phone: session.customer_details?.phone ?? "",
      },
      include: { orderItems: true },
    });
    pr(order, "order");
    const productIds = order.orderItems.map((orderItem) => orderItem.productId);
    await db.product.updateMany({
      where: { id: { in: [...productIds] } },
      data: {
        isArchived: true,
      },
    });
    return 200;
  }
  throw createError({
    statusCode: 400,
    statusMessage: "Unknown error occured",
  });
});
