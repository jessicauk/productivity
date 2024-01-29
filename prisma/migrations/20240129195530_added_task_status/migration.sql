/*
  Warnings:

  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "authorId" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;
