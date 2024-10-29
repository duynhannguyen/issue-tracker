import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Heading>{getIssueDetails.title}</Heading>
        <div className=" flex items-center space-x-3 my-2 ">
          <IssueStatusBadge status={getIssueDetails.status} />
          <Text>{getIssueDetails.createdAt.toDateString()}</Text>
        </div>
        <Card className="prose " mt={"4"}>
          <ReactMarkdown>{getIssueDetails.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${params.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
