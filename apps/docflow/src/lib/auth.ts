import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/db/schema";
import { GOOGLE_SCOPES } from "./google";
import { encryptIfPresent } from "./crypto";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: db
    ? DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      })
    : undefined,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: GOOGLE_SCOPES.join(" "),
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async linkAccount({ account }) {
      if (account.provider === "google" && account.refresh_token && db) {
        const { eq, and } = await import("drizzle-orm");
        await db
          .update(accounts)
          .set({
            refresh_token: encryptIfPresent(account.refresh_token),
            access_token: encryptIfPresent(account.access_token ?? null),
          })
          .where(
            and(
              eq(accounts.provider, account.provider),
              eq(accounts.providerAccountId, account.providerAccountId),
            ),
          );
      }
    },
    async signIn({ account }) {
      if (account?.provider === "google" && account.refresh_token && db) {
        const { eq, and } = await import("drizzle-orm");
        await db
          .update(accounts)
          .set({
            refresh_token: encryptIfPresent(account.refresh_token),
            access_token: encryptIfPresent(account.access_token ?? null),
          })
          .where(
            and(
              eq(accounts.provider, account.provider),
              eq(accounts.providerAccountId, account.providerAccountId),
            ),
          );
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  trustHost: true,
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
