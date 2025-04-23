import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const colorId = getRouterParam(event, "colorId");
  const color = await db.color.findUnique({ where: { id: colorId } });
  return color;
});
