import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof parseInt(params.id) !== "number") notFound();
  const getIssueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!getIssueDetails) notFound();

  return (
    <div>
      <Heading>{getIssueDetails.title}</Heading>
      <div className=" flex items-center space-x-3 my-2 ">
        <IssueStatusBadge status={getIssueDetails.status} />
        <Text>{getIssueDetails.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose " mt={"4"}>
        <ReactMarkdown>{getIssueDetails.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
