/*
  Warnings:

  - The primary key for the `Starred` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Starred` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gistId]` on the table `Starred` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Starred" DROP CONSTRAINT "Starred_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Starred_gistId_key" ON "Starred"("gistId");
