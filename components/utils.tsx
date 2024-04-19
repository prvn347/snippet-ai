"use server";
import { authOption } from "@/lib/authoption";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function CreateSnippet(gistMeta: {
  fileName: string;
  description: string;
  code: string;
  analyzedData: string;
}) {
  const session = await getServerSession(authOption);
  try {
    const snippet = await prisma.gist.create({
      data: {
        code: gistMeta.code,
        fileName: gistMeta.fileName,
        description: gistMeta.description,
        explaination: gistMeta.analyzedData,
        userId: session.user.id,
        access: "Public",
      },
    });
    console.log(snippet);
    return snippet;
  } catch (error: any) {
    throw new error("error while creating gist");
  }
}
