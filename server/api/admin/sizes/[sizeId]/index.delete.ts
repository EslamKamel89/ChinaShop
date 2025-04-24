import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session.user?.role != "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unathorized, you dont have ADMIN access",
    });
  }
  const sizeId = event.context.params?.sizeId;
  if (!sizeId) {
    throw createError({ statusCode: 404, statusMessage: "size not found" });
  }
  const size = await db.size.delete({ where: { id: sizeId } });
  return size;
});
