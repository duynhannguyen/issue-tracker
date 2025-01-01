-- CreateEnum
CREATE TYPE "IssueAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'CHANGE');

-- CreateEnum
CREATE TYPE "EventKind" AS ENUM ('ISSUE', 'ACCOUNT');

-- CreateTable
CREATE TABLE "IssueNoti" (
    "id" SERIAL NOT NULL,
    "action" "IssueAction" NOT NULL,
    "eventKind" "EventKind" NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "priority" "Priority" NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "IssueNoti_pkey" PRIMARY KEY ("id")
);
