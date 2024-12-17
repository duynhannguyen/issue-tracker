"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status) params.append("status", status);

        if (searchParams.get("orderBy") && searchParams.get("dir")) {
          params.append("orderBy", searchParams.get("orderBy")!);
          params.append("dir", searchParams.get("dir")!);
        }
        const a = params.toString();
        const b = params;

        const queryParam = params.size ? "?" + params.toString() : "";

        router.push(queryParam);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.label}
            value={status.value ? status.value : "ALL"}
          >
            {" "}
            {status.label}{" "}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
