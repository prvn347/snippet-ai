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
export async function findAllSnippets() {
  const session = await getServerSession(authOption);

  const getAllSnippets = await prisma.gist.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      fileName: true,
      code: true,
      createdAt: true,
      url: {
        select: {
          url: true,
        },
      },
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const final = getAllSnippets.map((snippet) => ({
    code: snippet.code,
    fileName: snippet.fileName,
    user: snippet.User.name,
    createdAt: snippet.createdAt,
    image: snippet.User.image,
    url: snippet.url.map((e) => {
      url: e.url;
    }),
    id: snippet.id,
  }));
  return final;
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

  return gisturl;
}
