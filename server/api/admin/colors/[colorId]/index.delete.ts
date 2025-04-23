import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role != "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unathorized, you dont have ADMIN access",
    });
  }
  const colorId = event.context.params?.colorId;
  if (!colorId) {
    throw createError({ statusCode: 404, statusMessage: "Color not found" });
  }
  const color = await db.color.delete({ where: { id: colorId } });
  return color;
});
