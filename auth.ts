import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import prismadb from "./lib/prismadb";
import { getUserById } from "./actions/user";

import GitHub from "next-auth/providers/github";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        // session.user.address = token.address as string;
        // session.user.city = token.city as string;
        // session.user.country = token.address as string;
        // session.user.postalCode = token.address as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});
