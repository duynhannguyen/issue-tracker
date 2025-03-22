"use server";

import prisma from "@/prisma/client";
import { inviteMemberSchema } from "../validationSchema";
import { z } from "zod";
import { sendMail } from "@/lib/mail";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import { render } from "@react-email/render";
import EmailTemplate from "../_components/EmailTemplate";
export async function inviteMember(data: z.infer<typeof inviteMemberSchema>) {
  const session = await getServerSession(authOptions);
  try {
    const validation = inviteMemberSchema.safeParse(data);
    if (!validation.success) {
      return {
        error: "Invalid email",
      };
    }
    const emailHtml = await render(
      EmailTemplate({
        teamName: session?.user.name as string,
        inviteLink: "http://localhost:3000/issues/list?group=2",
      })
    );
    await sendMail({
      to: data.email,
      body: emailHtml,
      subject: ` ${session?.user.name} invited to a issue group`,
    });
  } catch (error) {}
}
