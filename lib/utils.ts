import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "./authoption";
import { Snippet } from "next/font/google";
const prisma = new PrismaClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function CreateSnippet(
  url: string,
  fileName: string,
  description: string,
  code: string,
  analyzedData: string
) {
  const session = await getServerSession(authOption);
  try {
    const create = await prisma.$transaction(async (tx) => {
      const snippet = await tx.gist.create({
        data: {
          code: code,
          fileName: fileName,
          description: description,
          explaination: analyzedData,
          userId: session.user.id,
          access: "Public",
        },
      });
      await tx.gistUrl.create({
        data: {
          url: url,
          Access: "Public",
          gistId: snippet.id,
          userId: session.user.id,
        },
      });
    });
  } catch (error: any) {
    throw new error("error while creating gist");
  }
}
