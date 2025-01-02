import authOptions from "@/app/auth/authOptions";
import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      authorId: session.user.id,
      priority: body.priority,
    },
  });
  const createNoti = await prisma.issueNoti.create({
    data: {
      action: "CREATE",
      eventKind: "ISSUE",
      time: newIssue.createdAt,
      content: newIssue.title,
      priority: newIssue.priority,
      status: newIssue.status,
    },
  });

  return NextResponse.json(
    {
      newIssue,
      issueNoti: { ...createNoti, issueId: newIssue.id },
    },
    { status: 201 }
  );
}
