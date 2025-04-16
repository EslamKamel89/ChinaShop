import db from "~/utils/db";
import { authSchema } from "~/utils/validation";

export default defineEventHandler(async (e) => {
  const { email, password, name } = await readValidatedBody(e, (body) =>
    authSchema.parse(body)
  );
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "This email is already taken",
    });
  }
  const hashedPassword = await hashPassword(password);
  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });
  const transformedUser = santizeUser(user);
  if (transformedUser) {
    await setUserSession(e, {
      user: transformedUser,
    });
  }
  return sendRedirect(e, "/");
});
