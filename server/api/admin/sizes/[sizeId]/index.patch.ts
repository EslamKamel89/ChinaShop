import db from "~/utils/db";
import { sizeSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role !== "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }
  const { name, value } = await readValidatedBody(event, (body) => {
    return sizeSchema.parse(body);
  });
  const sizeId = event.context.params?.sizeId;
  if (!sizeId) {
    throw createError({ statusCode: 404, statusMessage: "size not found" });
  }
  const size = await db.size.update({
    where: { id: sizeId },
    data: { name, value },
  });
  return size;
});
