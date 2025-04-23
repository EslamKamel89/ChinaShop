import db from "~/utils/db";
import { ColorSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session?.user && session?.user?.role != "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }
  const { name } = await readValidatedBody(event, (body) =>
    ColorSchema.parse(body)
  );
  const color = await db.color.create({
    data: {
      name,
      userId: session.user.id,
      value: "test value",
    },
  });
  return { color };
});
