"use server";

import prisma from "@/prisma/client";
import { inviteMemberSchema } from "../validationSchema";
import { z } from "zod";
import { sendMail } from "@/lib/mail";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function inviteMember(data: z.infer<typeof inviteMemberSchema>) {
  const session = await getServerSession(authOptions);
  try {
    const validation = inviteMemberSchema.safeParse(data);
    if (!validation.success) {
      return {
        error: "Invalid email",
      };
    }
    await sendMail({
      to: data.email,
      body: "<h1>Hello word </h1>",
      subject: ` ${session?.user.name} invited to a issue group`,
    });
  } catch (error) {}
}
