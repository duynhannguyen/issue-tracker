import z from "zod";

const statusEnum = ["OPEN", "IN_PROGRESS", "CLOSED"] as const;
const priorityEnum = ["HIGH", "MEDIUM", "LOW"] as const;

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required ").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  priority: z.enum(priorityEnum, {
    errorMap: (issue, ctx) => ({
      message: "Priority must be HIGH, MEDIUM, LOW",
    }),
  }),
});
export const patchCreateIssueSchema = z.object({
  title: z.string().min(1, "Title is required ").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to user is requuired")
    .optional()
    .nullable(),
});

export const updateIssueSchema = z.object({
  title: z.string().min(1, "Title is required ").max(255),
  description: z.string().min(1, "Description is required"),
  status: z.enum(statusEnum, {
    errorMap: (issue, ctx) => ({
      message: "Status must be OPEN, IN_PROGRESS, or CLOSED",
    }),
  }),
  priority: z.enum(priorityEnum, {
    errorMap: (issue, ctx) => ({
      message: "Priority must be HIGH, MEDIUM or LOW",
    }),
  }),
});

export const createGroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required").max(255),
  creatorId: z.string().min(1, "Creator is required").max(255),
  color: z.string().optional(),
});
