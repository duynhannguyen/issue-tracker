"use client";
import { createIssueSchema, updateIssueSchema } from "@/app/validationSchema";
import { ErrorMessage, Spinner } from "@/app/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import {
  Button,
  Callout,
  RadioGroup,
  TextField,
  Text,
  Flex,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
type IssueFormData = z.infer<typeof createIssueSchema>;
type updateIssueData = z.infer<typeof updateIssueSchema>;
type IssueFormProps = {
  issue?: Issue;
};

const IssueForm = ({ issue }: IssueFormProps) => {
  const schema = issue ? updateIssueSchema : createIssueSchema;
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

        {issue && (
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, name, ref, onBlur } }) => (
              <RadioGroup.Root
                name={name}
                onChange={onChange}
                ref={ref}
                onBlur={onBlur}
                defaultValue={issue.status}
              >
                <Text
                  as="div"
                  size={"4"}
                >
                  <Flex
                    align={"center"}
                    gap={"2"}
                  >
                    <RadioGroup.Item value="OPEN" />
                    Open
                  </Flex>
                </Text>
                <Text
                  as="div"
                  size={"4"}
                >
                  <Flex
                    align={"center"}
                    gap={"2"}
                  >
                    <RadioGroup.Item value="IN_PROGRESS" />
                    In Progress
                  </Flex>
                </Text>
                <Text
                  as="div"
                  size={"4"}
                >
                  <Flex
                    align={"center"}
                    gap={"2"}
                  >
                    <RadioGroup.Item value="CLOSED" />
                    Closed
                  </Flex>
                </Text>
              </RadioGroup.Root>
            )}
          />
        )}

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
        <Button disabled={isSubmitting}>
          {" "}
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
