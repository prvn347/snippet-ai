-- CreateTable
CREATE TABLE "Starred" (
    "id" SERIAL NOT NULL,
    "gistId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL,

    CONSTRAINT "Starred_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Starred" ADD CONSTRAINT "Starred_gistId_fkey" FOREIGN KEY ("gistId") REFERENCES "Gist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Starred" ADD CONSTRAINT "Starred_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
