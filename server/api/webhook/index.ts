import { useServerStripe } from "#stripe/server";
import pr from "~/utils/pr";
export default defineEventHandler(async (event) => {
  pr("Custom Web hook");
  const stripe = await useServerStripe(event);
  const signature = (await getHeader(event, "stripe-signature")) as string;
  const body = await readRawBody(event);
  if (body == null) {
    throw createError({
      message: "Unknown error occured",
      statusCode: 400,
    });
  }
  pr(body, "body");
  // let stripeEvent = stripe.webhooks.constructEvent(
  //   body,
  //   signature,
  //   useRuntimeConfig().stripeWebHookSecret
  // );
});
