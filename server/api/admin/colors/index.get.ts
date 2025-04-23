import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const colors = await db.color.findMany({
    orderBy: { createdAt: "desc" },
  });
  return colors;
});
