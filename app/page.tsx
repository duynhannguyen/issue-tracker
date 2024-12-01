import Pagination from "@/components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSumary from "./IssueSumary";
import prisma from "@/prisma/client";
import IssuesChart from "./IssuesChart";

export default async function Home() {
  const openIssue = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgressIssue = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closedIssue = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  return (
    <IssuesChart
      open={openIssue}
      closed={closedIssue}
      inProgress={inProgressIssue}
    />
  );
}
