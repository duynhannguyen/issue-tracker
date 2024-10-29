import { Box, Button, TextField } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
