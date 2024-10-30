import z from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required ").max(255),
  description: z.string().min(1, "Description is required"),
});

const statusEnum = ["OPEN", "IN_PROGRESS", "CLOSED"] as const;

export const updateIssueSchema = z.object({
  title: z.string().min(1, "Title is required ").max(255),
  description: z.string().min(1, "Description is required"),
  status: z.enum(statusEnum, {
    errorMap: (issue, ctx) => ({
      message: "Status must be OPEN, IN_PROGRESS, or CLOSED",
    }),
  }),
});
