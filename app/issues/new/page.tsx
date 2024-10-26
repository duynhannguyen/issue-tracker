"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import z from "zod";
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  console.log("errors", errors);
  return (
    <div className="max-w-lg ">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issue", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred. ");
          }
        })}
        className=" space-y-3 "
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        {errors && (
          <Text color="red" as="p">
            {" "}
            {errors.title?.message}{" "}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors && (
          <Text color="red" as="p">
            {" "}
            {errors.description?.message}{" "}
          </Text>
        )}
        <Button> Submit New Issue </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
