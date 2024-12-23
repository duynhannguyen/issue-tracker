"use client";
import { createIssueSchema, updateIssueSchema } from "@/app/validationSchema";
import { ErrorMessage, IssueStatusBadge, Spinner } from "@/app/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, User } from "@prisma/client";
import {
  Button,
  Callout,
  TextField,
  Text,
  Flex,
  Select,
  Card,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { useSession } from "next-auth/react";
type IssueFormData = z.infer<typeof createIssueSchema>;
type updateIssueData = z.infer<typeof updateIssueSchema>;
type IssueFormProps = {
  issue?: Issue;
  assignee?: User[];
};

const IssueForm = ({ issue, assignee }: IssueFormProps) => {
  const schema = issue ? updateIssueSchema : createIssueSchema;
  const { data: session } = useSession();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updateIssueData | IssueFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: issue?.title,
      description: issue?.description,
      status: issue?.status,
      priority: issue?.priority || "MEDIUM",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch(`/api/issue/${issue.id}`, data);
      else await axios.post("/api/issue", data);

      router.push("/issues/list");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred. ");
    }
  });

  const isAssignee = assignee?.filter(
    (user) => user.id === issue?.assignedToUserId
  );
  console.log("isAssignee", isAssignee);

  return (
    <div className="max-w-lg ">
      {error && (
        <Callout.Root
          className="mb-5"
          color="red"
        >
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={onSubmit}
        className=" space-y-3 "
      >
        <TextField.Root>
          {" "}
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <Flex className="sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3  flex-col items-start space-y-3   ">
          <Card
            variant="surface"
            className="w-fit"
          >
            <Flex
              align={"center"}
              gap={"2"}
            >
              <Text>Priority:</Text>
              <Controller
                name="priority"
                control={control}
                render={({ field: { onChange, name, ref, onBlur } }) => (
                  <Select.Root
                    name={name}
                    onValueChange={onChange}
                    size="2"
                    defaultValue={issue?.priority || "MEDIUM"}
                    disabled={
                      issue?.status === "CLOSED" ||
                      !isAssignee ||
                      issue?.authorId !== session?.user.id
                    }
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="HIGH">
                        <IssueStatusBadge priority="HIGH" />
                      </Select.Item>
                      <Select.Item value="MEDIUM">
                        {" "}
                        <IssueStatusBadge priority="MEDIUM" />
                      </Select.Item>
                      <Select.Item value="LOW">
                        <IssueStatusBadge priority="LOW" />
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </Flex>
          </Card>
          {issue && (
            <Card
              variant="surface"
              className="w-fit"
            >
              <Flex
                align={"center"}
                gap={"2"}
              >
                <Text size={"3"}>Status:</Text>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, name, ref, onBlur } }) => (
                    <Select.Root
                      name={name}
                      onValueChange={onChange}
                      size="2"
                      defaultValue={issue.status}
                      disabled={
                        !isAssignee || issue.authorId !== session?.user.id
                      }
                    >
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Item value="OPEN">
                          <IssueStatusBadge status="OPEN" />
                        </Select.Item>
                        <Select.Item value="IN_PROGRESS">
                          {" "}
                          <IssueStatusBadge status="IN_PROGRESS" />
                        </Select.Item>
                        <Select.Item value="CLOSED">
                          {" "}
                          <IssueStatusBadge status="CLOSED" />
                        </Select.Item>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </Flex>
            </Card>
          )}
        </Flex>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {" "}
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
