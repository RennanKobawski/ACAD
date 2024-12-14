import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { Role } from "@prisma/client";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        await prisma.user.update({
          where: { email: user.email },
          data: { 
            role: existingUser.role || Role.UCCOPAgent, 
            image: user.image 
          },
        });
      } else {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name as string,
            role: Role.OperationalAgent,
            image: user.image || "",
          },

        });
      }
      return true;
    },

    async session({ session, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id,
            role: dbUser.role,
            createdAt: dbUser.createdAt.toISOString(),
            updatedAt: dbUser.updatedAt.toISOString(),
          };
        }
      }

      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};