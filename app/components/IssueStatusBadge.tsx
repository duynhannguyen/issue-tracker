import { Priority, Status } from "@prisma/client";
import { Badge, Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { SignalHigh, SignalLow, SignalMedium } from "lucide-react";
type StatusMap = Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
>;
type PriorityMap = Record<
  Priority,
  {
    label: string;
    color: "red" | "violet" | "green";
    icon: JSX.Element;
  }
>;

const statusMap: StatusMap = {
  OPEN: { label: "OPEN", color: "red" },
  IN_PROGRESS: { label: "IN_PROGRESS", color: "violet" },
  CLOSED: { label: "CLOSED", color: "green" },
};
const priorityMap: PriorityMap = {
  HIGH: { label: "HIGH", color: "red", icon: <SignalHigh size={24} /> },
  MEDIUM: {
    label: "MEDIUM",
    color: "violet",
    icon: <SignalMedium size={24} />,
  },
  LOW: { label: "LOW", color: "green", icon: <SignalLow size={24} /> },
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
        (priority && (
          <Flex align={"center"}>
            <div>{priorityMap[priority].icon}</div>
            <span className="h-2">{priorityMap[priority].label}</span>
          </Flex>
        ))}
    </Badge>
  );
};

export default IssueStatusBadge;
