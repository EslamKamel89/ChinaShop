import db from "~/utils/db";
import { colorSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session?.user && session?.user?.role != "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }
  const { name, value } = await readValidatedBody(event, (body) =>
    colorSchema.parse(body)
  );
  const color = await db.color.create({
    data: {
      name,
      userId: session.user.id,
      value,
    },
  });
  return { color };
});
