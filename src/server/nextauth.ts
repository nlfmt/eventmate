import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { prisma } from "@/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { env } from "@/env.mjs";
import { loginSchema } from "../validation/auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/signup",
    error: "/login",
  },
  callbacks: {
    jwt: async({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.username as string;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Dont waste time querying the database if the credentials cant be valid
        const res = await loginSchema.safeParseAsync(credentials);
        if (!res.success) throw new Error("Invalid Credentials");
        const cred = res.data;

        const user = await prisma.user.findUnique({
          where: { username: cred.username },
        });
        if (!user) throw new Error("Unknown User");

        const isValidPassword = await bcrypt.compare(
          cred.password,
          user.password
        );
        if (!isValidPassword) throw new Error("Invalid Password");

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
