import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof parseInt(params.id) !== "number") notFound();
  const getIssueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!getIssueDetails) notFound();

  return (
    <Grid
      columns={{ initial: "1", md: "2" }}
      gap={"5"}
    >
      <Box>
        <IssueDetails issue={getIssueDetails} />
      </Box>
      <Box>
        <EditIssueButton issueId={getIssueDetails.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
