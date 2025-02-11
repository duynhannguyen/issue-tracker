import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const GroupList = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const groups = await prisma.group.findMany({
    where: { creatorId: session.user.id },
  });
  console.log("groups", groups);
  return (
    <ul className="flex flex-wrap gap-2">
      {groups.map((groupItem) => (
        <li
          key={groupItem.id}
          className={`rounded-lg text-white text-xl font-bold px-2 py-1 h-20 w-52 bg-[${groupItem.color}] `}
        >
          <Link
            className=" inline-block h-full w-full"
            href={"/issues/list"}
          >
            {groupItem.name}{" "}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default GroupList;
