import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedSession = DefaultSession["user"] & { id: string };

declare module "next-auth" {
  interface Session {
    user: ExtendedSession;
  }
}
