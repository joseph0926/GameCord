import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { AUTH_ERRORS } from "./lib/errors";
import type { UserType } from "@/types/auth.type";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider,
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<UserType | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw AUTH_ERRORS.INVALID_CREDENTIALS;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            include: {
              accounts: true,
            },
          });

          if (!user || !user.password) {
            throw AUTH_ERRORS.INVALID_CREDENTIALS;
          }

          if (!user.emailVerified) {
            throw AUTH_ERRORS.EMAIL_NOT_VERIFIED;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordValid) {
            throw AUTH_ERRORS.INVALID_CREDENTIALS;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // OAuth 로그인 시 이메일 인증 확인
      if (account?.provider === "google") {
        return true;
      }

      return !!user.emailVerified;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name ?? null;
        session.user.email = token.email!;
        session.user.image = token.picture as string | null;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.emailVerified = user.emailVerified;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});
