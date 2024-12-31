import React from "react";
import { IssueNoti } from "../NavBar";
import { Flex, Text, Badge } from "@radix-ui/themes";
import formatDate from "../helper/formatDate";
import { PriorityMap, StatusMap } from "./IssueStatusBadge";

const IssueNotiLayout = ({
  action,
  content,
  eventKind = "Issue",
  time,
  status,
  priority,
  notiStatus,
  priorityStatus,
}: IssueNoti & {
  notiStatus: StatusMap;
  priorityStatus: PriorityMap;
}) => {
  return (
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
      <Text as="div">
        The Issue{" "}
        <Badge
          className="w-fit"
          color="gray"
        >
          {content}
        </Badge>
        {action !== "Change" && ` has been ${action} `}
        {action === "Change" && `has been changed to ${status || priority}`}
      </Text>
      <Text
        size="1"
        as="div"
        className="text-gray-400"
      >
        {time && formatDate(time)}
      </Text>
    </Flex>
  );
};

export default IssueNotiLayout;
