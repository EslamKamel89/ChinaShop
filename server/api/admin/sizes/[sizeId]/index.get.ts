import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const sizeId = getRouterParam(event, "sizeId");
  const size = await db.size.findUnique({ where: { id: sizeId } });
  return size;
});
