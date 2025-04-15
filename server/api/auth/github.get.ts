import { santizeUser } from "~/server/utils/auth";
import db from "~/utils/db";
export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    let currentUser = await db.user.findUnique({
      where: { email: user.email },
    });
    if (!currentUser) {
      currentUser = await db.user.create({
        data: { email: user.email, name: user.name, avatarUrl: user.avatarUrl },
      });
    }
    let oAuthAccount = await db.oauthAccount.findFirst({
      where: { userId: currentUser.id },
    });
    if (!oAuthAccount) {
      oAuthAccount = await db.oauthAccount.create({
        data: {
          userId: currentUser.id,
          providerId: "github",
          providerUserId: user.id + "",
        },
      });
    }
    const trasnformedUser = santizeUser(currentUser);
    if (trasnformedUser) {
      await setUserSession(event, {
        user: santizeUser(currentUser)!,
      });
    }
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
