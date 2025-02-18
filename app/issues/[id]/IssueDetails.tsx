import { IssueStatusBadge } from "@/app/_components";
import { Issue, User } from "@prisma/client";
import { Heading, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue, author }: { issue: Issue; author?: User }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <div className=" flex items-center space-x-3 my-2 ">
        <IssueStatusBadge status={issue.status} />

        <Text
          color="gray"
          size={"2"}
        >
          {" "}
          Created by {author?.name}, {issue.createdAt.toDateString()}
        </Text>
      </div>
      <Card
        className="prose max-w-full "
        mt={"4"}
      >
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
