import { Box, Button, TextField } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/components";
const NewIssueLoading = () => {
  return (
    <Box className=" max-w-xl space-y-3 ">
      <Skeleton />
      <Skeleton height={"20rem"} />

      <Skeleton width={"8rem"} />
    </Box>
  );
};

export default NewIssueLoading;
