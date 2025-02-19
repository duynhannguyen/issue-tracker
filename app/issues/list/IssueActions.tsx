import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
type IssueActionsProps = {
  group: string;
};
const IssueActions = ({ group }: IssueActionsProps) => {
  return (
    <Flex justify={"between"}>
      <IssueStatusFilter />
      <Button>
        <Link href={`/issues/new/?group=${group}`}>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
