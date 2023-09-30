import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KaKaoProvider from 'next-auth/providers/kakao';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@/lib/db';
import { redis } from '@/lib/redis';
import { User } from '@prisma/client';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    NaverProvider({
      clientId: process.env.NAVER_ID as string,
      clientSecret: process.env.NAVER_SECRET as string
    }),
    KaKaoProvider({
      clientId: process.env.KAKAO_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일 또는 비밀번호는 필수값입니다.');
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (!user || !user.password) {
          throw new Error('해당 아이디를 찾을 수 없습니다.');
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        await redis.set(`user:${user.id}`, JSON.stringify(user), {
          ex: 1000
        });
      }
      return token;
    },
    async session({ session, token }) {
      const cachedUserString: string | null = await redis.get(`user:${token.sub}`);
      const cachedUser: User | null = cachedUserString ? JSON.parse(cachedUserString) : null;
      if (cachedUser) {
        session.user = { ...session.user, ...cachedUser };
        return session;
      }

      const dbUser = await db.user.findUnique({
        where: {
          id: token.sub
        }
      });
      if (dbUser) {
        await redis.set(`user:${token.sub}`, JSON.stringify(dbUser), { ex: 1000 });
        session.user = { ...session.user, ...dbUser };
      }

      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
