import db from "~/utils/db";
import { colorSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role !== "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }
  const { name, value } = await readValidatedBody(event, (body) => {
    return colorSchema.parse(body);
  });
  const colorId = event.context.params?.colorId;
  if (!colorId) {
    throw createError({ statusCode: 404, statusMessage: "Color not found" });
  }
  const color = await db.color.update({
    where: { id: colorId },
    data: { name, value },
  });
  return color;
});
