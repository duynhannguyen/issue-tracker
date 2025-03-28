import prisma from "@/prisma/client";
import { Card, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import IssueSumary from "../../IssueSumary";
import IssuesChart from "../../IssuesChart";
import LatestIssues from "../../LatestIssues";
import SideBar from "./SideBar";

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
    //   {/* <LatestIssues /> */}
  );
};
export const dynamic = "force-dynamic";

export default Dashboard;
