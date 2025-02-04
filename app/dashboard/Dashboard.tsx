import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import React from "react";
import IssueSumary from "../IssueSumary";
import IssuesChart from "../IssuesChart";
import LatestIssues from "../LatestIssues";

const Dashboard = async () => {
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
};
export const dynamic = "force-dynamic";

export default Dashboard;
