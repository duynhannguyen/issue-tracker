import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/_components";
const EditIssueFormSkeleton = () => {
  return (
    <Box className=" max-w-xl space-y-3 ">
      <Skeleton />
      <div className="max-w-28">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton height={"20rem"} />
      <Skeleton width={"8rem"} />
    </Box>
  );
};

export default EditIssueFormSkeleton;
