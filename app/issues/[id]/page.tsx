import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssignSelect from "./AssignSelect";
type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof parseInt(params.id) !== "number") notFound();

  const session = await getServerSession(authOptions);

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
      {session && (
        <Box>
          <Flex
            direction={"column"}
            gap={"4"}
          >
            <AssignSelect issue={getIssueDetails} />
            <EditIssueButton issueId={getIssueDetails.id} />
            <DeleteIssueButton issueId={getIssueDetails.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return {
    title: issue?.title,
    description: "Detail of issue " + issue?.id,
  };
}

export const revalidate = 0;
export default IssueDetailPage;
