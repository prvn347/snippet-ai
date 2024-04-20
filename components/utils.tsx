"use server";
import { authOption } from "@/lib/authoption";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
import Error from "next/error";
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
    const gisturl = await prisma.gistUrl.create({
      data: {
        url: `http://localhost:3000/snippet/${snippet.id}`,
        userId: session.user.id,
        Access: "Public",
        gistId: snippet.id,
      },
    });
    console.log(gisturl);

    console.log(snippet);
    return snippet;
  } catch (error: any) {
    return null;
  }
}

export async function getSnippet(id: number) {
  try {
    const snippet = await prisma.gist.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        fileName: true,
        description: true,
        explaination: true,
        code: true,
        User: {
          select: {
            name: true,
          },
        },
      },
    });
    return snippet;
  } catch (error: any) {
    return null;
  }
}
export async function findAllSnippets(userId: string) {
  const session = await getServerSession(authOption);

  const getAllSnippets = await prisma.user.findMany({
    where: {
      id: session.user.id,
    },
    select: {
      name: true,
      image: true,
      Gist: {
        select: {
          code: true,
          createdAt: true,
        },
      },
      GistUrl: {
        select: {
          url: true,
        },
      },
    },
  });
}

export async function createGistUrl(gistMeta: { url: string; gistId: number }) {
  const session = await getServerSession(authOption);
  const gisturl = await prisma.gistUrl.create({
    data: {
      url: gistMeta.url,
      userId: session.user.id,
      Access: "Public",
      gistId: gistMeta.gistId,
    },
  });
  console.log(gisturl);
  return gisturl;
}
