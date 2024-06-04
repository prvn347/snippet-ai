"use server";
import { authOption } from "@/lib/authoption";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
import Error from "next/error";
import { access } from "fs";
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
        access: true,
        code: true,
        url: true,
        createdAt: true,
        comments: {
          select: {
            text: true,
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
      access: true,
      createdAt: true,
      url: true,
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
    access: snippet.access,
    createdAt: snippet.createdAt,
    image: snippet.User.image,

    id: snippet.id,
  }));

  return final;
}
export async function getGistUrls() {
  const session = await getServerSession(authOption);
  const gistUrls = await prisma.gistUrl.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      url: true,
      gistId: true,
    },
  });
  console.log(gistUrls);
  return gistUrls;
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
export async function createComment(gistId: number, comment: string) {
  const session = await getServerSession(authOption);

  const gistComment = await prisma.comment.create({
    data: {
      text: comment,
      userId: session.user.id,
      gistId: gistId,
    },
  });
  console.log(gistComment);
  return gistComment;
}
