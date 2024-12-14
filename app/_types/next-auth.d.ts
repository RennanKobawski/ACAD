/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
/* eslint-enable @typescript-eslint/no-unused-vars */

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
