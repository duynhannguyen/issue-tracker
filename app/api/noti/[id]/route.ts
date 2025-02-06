import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { IssueNoti } from "@prisma/client";
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
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const noti = await prisma.issueNoti.findMany({
    where: {
      OR: [
        { receiver: "ALL" },
        {
          receiver: params.id,
        },
      ],
    },
    orderBy: {
      time: "desc",
    },
    take: 10,
  });
  if (!noti)
    return NextResponse.json("Unexpected error", {
      status: 404,
    });

  return NextResponse.json(noti, {
    status: 200,
  });
};

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const issue: IssueNoti = await request.json();
  await prisma.issueNoti.create({
    data: {
      ...issue,
    },
  });

  return NextResponse.json(
    { text: "Ok" },
    {
      status: 200,
    }
  );
};

export const PATCH = async (request: NextRequest) => {
  const body = await request.json();
  if (body.isRead) {
    return NextResponse.json("ok", { status: 200 });
  }

  const noti = await prisma.issueNoti.update({
    where: {
      id: body.id,
    },
    data: {
      markAsRead: true,
    },
  });

  return NextResponse.json("ok", { status: 200 });
};
