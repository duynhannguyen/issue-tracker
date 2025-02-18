import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import classNames from "classnames";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
const GroupList = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const groups = await prisma.group.findMany({
    where: { creatorId: session.user.id },
  });
  return (
    <ul className="flex flex-wrap gap-2">
      {groups.map((groupItem) => {
        return (
          <li
            style={{
              backgroundColor: groupItem.color,
            }}
            key={groupItem.id}
            className={classNames("group-link")}
          >
            <Link
              className=" inline-block h-full w-full"
              href={`/dashboard/groups/${groupItem.id}`}
            >
              {groupItem.name}{" "}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default GroupList;
