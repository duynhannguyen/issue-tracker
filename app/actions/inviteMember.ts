"use server";

import prisma from "@/prisma/client";
import { inviteMemberSchema } from "../validationSchema";
import { z } from "zod";

export async function inviteMember(data: z.infer<typeof inviteMemberSchema>) {
  try {
    const validation = inviteMemberSchema.safeParse(data);
    if (!validation.success) {
      return {
        error: "Invalid email",
      };
    }
    //sending invite email
  } catch (error) {}
}
