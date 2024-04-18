/*
  Warnings:

  - You are about to drop the column `title` on the `Gist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gist" DROP COLUMN "title",
ADD COLUMN     "fileName" TEXT;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "gistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_gistId_fkey" FOREIGN KEY ("gistId") REFERENCES "Gist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
