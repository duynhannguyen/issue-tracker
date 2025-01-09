import React from "react";

import { Flex, Text, Badge } from "@radix-ui/themes";
import formatDate from "../helper/formatDate";
import { PriorityMap, StatusMap } from "./IssueStatusBadge";
import Link from "next/link";
import { Dot } from "lucide-react";
import { IssueNoti } from "@prisma/client";

const IssueNotiLayout = ({
  action,
  content,
  eventKind = "ISSUE",
  time,
  status,
  priority,
  notiStatus,
  priorityStatus,
  issueId,
  id,
  markAsRead,
  userId,
}: IssueNoti & {
  notiStatus: StatusMap;
  priorityStatus: PriorityMap;
}) => {
  return (
    // <Link href={`${process.env.NEXT_PUBLIC_URL}/issues/${issueId}`}>
    <Flex
      align={"start"}
      gap={"2"}
    >
      {!markAsRead && <Dot className="text-sky-600" />}
      <Flex
        direction={"column"}
        gap={"2"}
      >
        <Flex justify={"between"}>
          {status && (
            <Badge
              size="1"
              color={notiStatus[status].color}
            >
              Status: {notiStatus[status].label}
            </Badge>
          )}

          {priority && (
            <Badge color={priorityStatus[priority].color}>
              Priority: {priorityStatus[priority].label}
            </Badge>
          )}
        </Flex>
        <Text
          size={"3"}
          as="div"
        >
          The Issue{" "}
          <Badge
            className="w-fit"
            color="gray"
          >
            {content}
          </Badge>
          {action !== "CHANGE" && ` has been ${action} `}
          {action === "CHANGE" && `has been changed to ${status || priority}`}
        </Text>
        <Text
          size="1"
          as="div"
          className="text-gray-400"
        >
          {time && formatDate(time)}
        </Text>
      </Flex>
    </Flex>
    // </Link>
  );
};

export default IssueNotiLayout;
