import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name?: string;
      image?: string;
    } & DefaultSession["OperationalAgent"];
  }

  interface User {
    id: string;
    role: string;
    email: string;
    name?: string;
    image?: string;
  }

  
    export enum Role  {
      UCCOPAgent = "UCCOPAgent",
      OperationalAgent = "OperationalAgent",
    }
}
