import Pagination from "@/app/_components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { ErrorMessage } from "@/app/_components";

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const groupId = searchParams.group ? parseInt(searchParams.group) : NaN;
  if (isNaN(groupId)) {
    return (
      <ErrorMessage>
        <div className="flex flex-col justify-center items-center gap-2 ">
          <span className=" font-semibold ">
            Failed to fetch issue, please go back to dashboard then try again
          </span>

          <a
            className="text-white border px-2 py-2 rounded-lg bg-primary/70 "
            href="/dashboard/groups"
          >
            Back to dashboard
          </a>
        </div>
      </ErrorMessage>
    );
  }
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status, groupId };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.dir }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const getIssues = await prisma.issue.findMany({
    where,
    include: { author: true },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex
      direction={"column"}
      gap={"3"}
    >
      <IssueActions group={groupId} />
      <IssueTable
        searchParams={searchParams}
        issues={getIssues}
      />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all issues",
};

export default IssuesPage;
