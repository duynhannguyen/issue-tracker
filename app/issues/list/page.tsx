import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import IssueActions from "./IssueActions";
import CustomLink from "@/components/CustomLink";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; dir: "asc" | "desc" };
}) => {
  const columns: {
    title: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { title: "Issues", value: "title" },
    { title: "Status", value: "status", className: "hidden md:table-cell" },
    {
      title: "Created",
      value: "createdAt",
      className: "hidden md:table-cell ",
    },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const getIssues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div>
      <IssueActions />
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
          {getIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomLink href={`${issue.id}`}>{issue.title}</CustomLink>
                <div className="md:hidden block">
                  <IssueStatusBadge status={issue.status} />
                </div>
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
    </div>
  );
};

export default IssuesPage;
