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
        url: `https://snippetai-xi.vercel.app/snippet/${snippet.id}`,
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
    console.log(" from get snippet funtion " + id);
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
        starred: true,
        comments: {
          select: {
            text: true,
            User: true,
            createdAt: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    console.log(snippet);
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

  return gistComment;
}

export async function getComments(gistId: number) {
  const comment = await prisma.comment.findMany({
    where: {
      gistId: gistId,
    },
    select: {
      text: true,
      User: {
        select: {
          name: true,
          image: true,
        },
      },
      createdAt: true,
    },
  });
  return comment;
}

export async function toggleStarred(id: number) {
  try {
    const checkStarred = await prisma.gist.findFirst({
      where: {
        id: id,
      },
      select: {
        starred: true,
      },
    });

    if (checkStarred) {
      const starred = await prisma.gist.update({
        where: {
          id: id,
        },
        data: {
          starred: !checkStarred?.starred,
        },
        select: {
          starred: true,
        },
      });
      return starred;
    } else {
    }
    return checkStarred;
  } catch (error) {
    console.log(error);
  }
}

export async function getStarred() {
  const session = await getServerSession(authOption);
  const starred = await prisma.gist.findMany({
    where: {
      userId: session.user.id,
      starred: true,
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
  const final = starred.map((snippet) => ({
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

// export async function toggleStarred(userId: string, gistId: number) {
//   try {
//     // Retrieve the current starred record
//     const currentStarred = await prisma.starred.findFirst({
//       where: {
//         userId: userId,
//         gistId: gistId,
//       },
//     });
//     console.log(currentStarred);
//     if (currentStarred) {
//       // Update the starred field to the opposite value
//       const updatedStarred = await prisma.starred.update({
//         where: {
//           id: currentStarred.id,
//         },
//         data: {
//           starred: !currentStarred.starred,
//         },
//       });
//       console.log("Starred status toggled:", updatedStarred);
//       return updatedStarred;
//     } else {
//       const createStarred = await prisma.starred.create({
//         data: {
//           starred: true,
//           gistId: gistId,
//           userId: userId,
//         },
//       });

//       console.log("Starred record not found. so created new.", createStarred);
//       return createStarred;
//     }
//   } catch (error) {
//     console.error("Error toggling starred status:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
