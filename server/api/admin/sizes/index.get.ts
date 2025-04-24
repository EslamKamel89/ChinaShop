import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const sized = await db.size.findMany({
    orderBy: { createdAt: "desc" },
  });
  return sized;
});
