import type { DefaultSession } from "next-auth";

export type UserType = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image?: string | null;
  password?: string | null;
};

declare module "next-auth" {
  interface Session {
    user: UserType & DefaultSession["user"];
  }

  interface User extends UserType {
    accounts?: {
      provider: string;
      providerAccountId: string;
      type: string;
    }[];
  }
}
