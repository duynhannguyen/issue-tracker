-- DropForeignKey
ALTER TABLE "IssueNoti" DROP CONSTRAINT "IssueNoti_issueId_fkey";

-- AlterTable
ALTER TABLE "IssueNoti" ALTER COLUMN "issueId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IssueNoti" ADD CONSTRAINT "IssueNoti_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
