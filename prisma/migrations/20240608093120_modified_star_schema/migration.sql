/*
  Warnings:

  - You are about to drop the `Starred` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Starred" DROP CONSTRAINT "Starred_gistId_fkey";

-- DropForeignKey
ALTER TABLE "Starred" DROP CONSTRAINT "Starred_userId_fkey";

-- AlterTable
ALTER TABLE "Gist" ADD COLUMN     "starred" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Starred";
