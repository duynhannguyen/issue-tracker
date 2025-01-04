/*
  Warnings:

  - Added the required column `userId` to the `IssueNoti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssueNoti" ADD COLUMN     "userId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "IssueNoti" ADD CONSTRAINT "IssueNoti_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
