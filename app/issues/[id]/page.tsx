import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
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
      columns={{ initial: "1", sm: "5" }}
      gap={"5"}
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={getIssueDetails} />
      </Box>
      <Box>
        <Flex
          direction={"column"}
          gap={"4"}
        >
          <EditIssueButton issueId={getIssueDetails.id} />
          <DeleteIssueButton issueId={getIssueDetails.id} />
        </Flex>
      </Box>
    </Grid>
  );
};
export const revalidate = 0;
export default IssueDetailPage;
