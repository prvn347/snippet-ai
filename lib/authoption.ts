import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { use } from "react";
import { Adapter } from "next-auth/adapters";
const prisma = new PrismaClient();
export const authOption = {
  // adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });
        if (!user) {
          const newuser = await prisma.user.create({
            data: {
              email: session.user.email,
              name: session.user.name,
              image: session.user.image,
              password: "password",
            },
          });
          return session;
        }

        session.user.id = token.uid;

        return session;
      } catch (error: any) {
        throw new error("error while logging");
      }
    },
  },
};
