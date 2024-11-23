import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      credentials: {
        phone: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            phone: credentials.phone as string,
          },
        });

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/signin',
    error: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      return session;
    },
  },
});
