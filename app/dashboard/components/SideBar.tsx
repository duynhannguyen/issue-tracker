import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";

const SideBar = () => {
  const sideBarLinks = [{ title: "Groups", href: "/groups" }];

  return (
    <Flex direction={"column"}>
      <Link
        className="hover:bg-gray-200 px-2 py-1 transition-colors duration-200 rounded-lg  "
        href={"#"}
      >
        <Flex
          align={"center"}
          gap={"2"}
        >
          <FaUserGroup />
          <p>Group</p>
        </Flex>
      </Link>
    </Flex>
  );
};

export default SideBar;
