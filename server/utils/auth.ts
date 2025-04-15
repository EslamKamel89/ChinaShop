import type { User } from "@prisma/client";

export const santizeUser = (user: User | null | undefined) => {
  if (!user) return null;
  // @ts-ignore
  delete user.hashedPassword;
  return user;
};
