import { CustomLink, IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  dir: "asc" | "desc";
  page: string;
};

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              className={column.className}
              key={column.value}
            >
              <Link
                href={
                  searchParams.dir === "asc"
                    ? {
                        query: {
                          ...searchParams,
                          orderBy: column.value,
                          dir: "desc",
                        },
                      }
                    : {
                        query: {
                          ...searchParams,
                          orderBy: column.value,
                          dir: "asc",
                        },
                      }
                }
              >
                {column.title}{" "}
              </Link>
              {column.value === searchParams.orderBy &&
                searchParams.dir === "asc" && (
                  <ArrowUpIcon className="inline font-bold " />
                )}
              {column.value === searchParams.orderBy &&
                searchParams.dir === "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <CustomLink href={`${issue.id}`}>{issue.title}</CustomLink>
              <div className="md:hidden block">
                <IssueStatusBadge status={issue.status} />
              </div>
              <div className="md:hidden block ">
                <IssueStatusBadge priority={issue.priority} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge priority={issue.priority} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell ">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  title: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { title: "Issues", value: "title" },
  {
    title: "Priority",
    value: "priority",
    className: "hidden md:table-cell",
  },
  { title: "Status", value: "status", className: "hidden md:table-cell" },
  {
    title: "Created",
    value: "createdAt",
    className: "hidden md:table-cell ",
  },
];

export default IssueTable;
export const columnNames = columns.map((column) => column.value);
