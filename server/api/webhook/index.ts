import { useServerStripe } from "#stripe/server";
import pr from "~/utils/pr";
export default defineEventHandler(async (event) => {
  pr("Custom Web hook");
  const stripe = await useServerStripe(event);
});
