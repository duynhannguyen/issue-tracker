import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
const IssueFormSkeleton = () => {
  return (
    <Box className=" max-w-xl space-y-3 ">
      <Skeleton />
      <Skeleton height={"20rem"} />
      <Skeleton width={"8rem"} />
    </Box>
  );
};

export default IssueFormSkeleton;
