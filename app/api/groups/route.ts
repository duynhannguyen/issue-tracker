import authOptions from "@/app/auth/authOptions";
import { createGroupSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "Please authorized",
      },
      { status: 401 }
    );
  }
  const body = await req.json();
  const validation = createGroupSchema.safeParse(body);
  console.log("validation", validation);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
  console.log("validation", validation);
  const { groupName, color } = validation.data;

  const existingGroup = await prisma.group.findFirst({
    where: {
      name: groupName,
    },
  });
  if (existingGroup) {
    return NextResponse.json("Group already exist", {
      status: 400,
    });
  }

  const createGroup = await prisma.group.create({
    data: {
      name: groupName,
      color,
      creatorId: session?.user.id,
    },
  });
  revalidatePath("/dashboard/groups");
  return NextResponse.json(
    {
      group: createGroup,
      message: "Create group successfully",
    },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "Please authorized",
      },
      { status: 401 }
    );
  }

  const getGroup = await prisma.group.findMany({
    where: {
      creatorId: session?.user.id,
    },
  });

  console.log("getGroup", getGroup);
  return NextResponse.json(
    {
      getGroup,
    },
    { status: 200 }
  );
}
