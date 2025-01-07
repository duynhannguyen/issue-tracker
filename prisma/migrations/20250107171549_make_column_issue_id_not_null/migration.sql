/*
  Warnings:

  - Made the column `issueId` on table `IssueNoti` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "IssueNoti" DROP CONSTRAINT "IssueNoti_issueId_fkey";

-- AlterTable
ALTER TABLE "IssueNoti" ALTER COLUMN "issueId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "IssueNoti" ADD CONSTRAINT "IssueNoti_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
