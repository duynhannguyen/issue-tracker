import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  console.log(1);
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const noti = await prisma.issueNoti.findMany({
    where: {
      userId: params.id,
    },
    orderBy: {
      time: "desc",
    },
  });
  console.log("nhan", noti);
  console.log("session", params.id);
  if (!noti)
    return NextResponse.json("Unexpected error", {
      status: 404,
    });

  return NextResponse.json(noti, {
    status: 200,
  });
};
