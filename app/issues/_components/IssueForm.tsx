"use client";
import { Button, Callout, RadioGroup, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema, updateIssueSchema } from "@/app/validationSchema";
import z from "zod";
import { ErrorMessage, Spinner } from "@/components";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
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
    console.log("data", data);
    try {
      setSubmitting(true);
      if (issue) await axios.patch(`/api/issue/${issue.id}`, data);
      else await axios.post("/api/issue", data);

      router.push("/issues");
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
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>

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
                <RadioGroup.Item value="OPEN">OPEN</RadioGroup.Item>
                <RadioGroup.Item value="IN_PROGRESS">
                  IN_PROGRESS
                </RadioGroup.Item>
                <RadioGroup.Item value="CLOSED">CLOSED</RadioGroup.Item>
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
