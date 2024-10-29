import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import delay from "delay";
import IssueActions from "./IssueActions";
import Link from "next/link";
import CustomLink from "@/components/CustomLink";
const IssuesPage = async () => {
  const getIssues = await prisma.issue.findMany();
  await delay(2000);
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell ">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell ">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {getIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {/* <Link href={`/issues/${issue.id}`}>{issue.title}</Link> */}
                <CustomLink href={`issues/${issue.id}`}>
                  {issue.title}
                </CustomLink>
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