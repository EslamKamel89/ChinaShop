import db from "~/utils/db";
import { authSchema } from "~/utils/validation";

export default defineEventHandler(async (e) => {
  const { email, password } = await readValidatedBody(e, (body) =>
    authSchema.parse(body)
  );
  const user = await db.user.findFirst({
    where: { email },
    include: { oauthAccounts: true },
  });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid Credentials",
    });
  }
  if (!user.hashedPassword) {
    if (user.oauthAccounts.length) {
      throw createError({
        statusCode: 401,
        statusMessage: `This account is registred with ${user.oauthAccounts[0].providerId}. Please use ${user.oauthAccounts[0].providerId} to login into your account `,
      });
    }
  }
  const isPasswordCorrect = await verifyPassword(
    user.hashedPassword ?? "",
    password
  );
  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid Credentials",
    });
  }
  const transformedUser = santizeUser(user);
  if (transformedUser) {
    await clearUserSession(e);
    await setUserSession(e, {
      user: transformedUser,
    });
    await getUserSession(e);
  }
  return transformedUser;
});
