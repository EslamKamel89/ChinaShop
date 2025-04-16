import db from "~/utils/db";
import { authSchema } from "~/utils/validation";

export default defineEventHandler(async (e) => {
  const { email, password } = await readValidatedBody(e, (body) =>
    authSchema.parse(body)
  );
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invlaid Credentials",
    });
  }
  const transformedUser = santizeUser(user);
  if (transformedUser) {
    await setUserSession(e, {
      user: transformedUser,
    });
  }
  return transformedUser;
});
