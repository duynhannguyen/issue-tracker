import { Badge, Flex, Text } from "@radix-ui/themes";
import React from "react";
import Skeleton from "./Skeleton";
const IssueNotiSkeleton = () => {
  const array = [1, 2, 3, 4, 5];
  return array.map((item) => (
    <Flex
      key={item}
      direction={"column"}
      gap={"2"}
      className="mb-3"
    >
      <Flex justify={"between"}>
        {" "}
        <Badge
          color="gray"
          className="max-w-[100px] w-28 "
        >
          {" "}
          <Skeleton />{" "}
        </Badge>
        <Badge
          color="gray"
          className="max-w-[100px] w-28  "
        >
          {" "}
          <Skeleton />{" "}
        </Badge>
      </Flex>
      <Text
        size={"6"}
        as="div"
      >
        <Skeleton />{" "}
      </Text>
      <Text
        size="1"
        as="div"
        className="text-gray-400 max-w-[100px] "
      >
        {" "}
        <Skeleton />{" "}
      </Text>
    </Flex>
  ));
};

export default IssueNotiSkeleton;
