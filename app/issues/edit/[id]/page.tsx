import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import EditIssueFormSkeleton from "./loading";

type EditIssuePageProps = {
  params: { id: string };
};

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <EditIssueFormSkeleton />,
});
const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  const assignee = await prisma.user.findMany({
    where: { id: issue?.assignedToUserId ?? undefined },
  });

  return (
    <IssueForm
      issue={issue}
      assignee={assignee ?? undefined}
    />
  );
};

export default EditIssuePage;
