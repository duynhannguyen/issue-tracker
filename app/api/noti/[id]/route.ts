import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return NextResponse.json(
    {
      text: "success",
    },
    {
      status: 200,
    }
  );
};
