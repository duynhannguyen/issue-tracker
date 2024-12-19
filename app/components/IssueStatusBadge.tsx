import { Priority, Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

type StatusMap = Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
>;
type PriorityMap = Record<
  Priority,
  {
    label: string;
    color: "red" | "violet" | "green";
  }
>;

const statusMap: StatusMap = {
  OPEN: { label: "OPEN", color: "red" },
  IN_PROGRESS: { label: "IN_PROGRESS", color: "violet" },
  CLOSED: { label: "CLOSED", color: "green" },
};
const priorityMap: PriorityMap = {
  HIGH: { label: "HIGH", color: "red" },
  MEDIUM: { label: "MEDIUM", color: "violet" },
  LOW: { label: "LOW", color: "green" },
};

const IssueStatusBadge = ({
  status,
  priority,
}: {
  status?: Status;
  priority?: Priority;
}) => {
  if (!status && !priority) return null;

  return (
    <Badge
      color={
        (status && statusMap[status].color) ||
        (priority && priorityMap[priority].color)
      }
    >
      {(status && statusMap[status].label) ||
        (priority && priorityMap[priority].label)}
    </Badge>
  );
};

export default IssueStatusBadge;
