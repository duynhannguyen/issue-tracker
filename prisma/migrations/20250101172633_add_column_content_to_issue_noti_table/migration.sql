/*
  Warnings:

  - Added the required column `content` to the `IssueNoti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssueNoti" ADD COLUMN     "content" TEXT NOT NULL;
