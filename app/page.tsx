import LatestIssues from "./LatestIssues";
import IssueSumary from "./IssueSumary";
import prisma from "@/prisma/client";
import IssuesChart from "./IssuesChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

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
    <Grid
      columns={{ initial: "1", md: "2" }}
      gap={"5"}
    >
      <Flex
        direction={"column"}
        gap={"5"}
      >
        <IssueSumary
          closed={closedIssue}
          open={openIssue}
          inProgress={inProgressIssue}
        />
        <IssuesChart
          closed={closedIssue}
          open={openIssue}
          inProgress={inProgressIssue}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
