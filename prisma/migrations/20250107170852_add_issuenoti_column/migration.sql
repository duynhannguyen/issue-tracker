/*
  Warnings:

  - Added the required column `issueId` to the `IssueNoti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssueNoti" ADD COLUMN     "issueId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "IssueNoti" ADD CONSTRAINT "IssueNoti_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
