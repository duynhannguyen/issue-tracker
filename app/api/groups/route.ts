import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(
    {
      message: "Create group successfully",
    },
    { status: 201 }
  );
}
