import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Heading, Card, Box } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const IssueDetailLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <div className=" flex items-center space-x-3 my-2 ">
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </div>
      <Card className="prose " mt={"4"}>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailLoading;
