"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createGroupSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "@/app/_components";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
const GroupDialog = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      groupName: "",
      color: "#ffb300",
    },
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsCreating(true);
      const creatingGroup = await axios.post("/api/groups", data);
      router.refresh();
      setIsCreating(false);
      setIsOpen(false);
    } catch (error) {
      setIsCreating(false);
      if (error instanceof AxiosError) {
        setSubmitError(error?.response?.data);
      }
    }
  });
  return (
    <div>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          reset();
        }}
      >
        <Dialog.Trigger>
          <Button
            variant="soft"
            className="rounded-lg font-semibold p-1 h-20 w-52 "
          >
            Create new group
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create Your Group</Dialog.Title>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            <ErrorMessage>{submitError}</ErrorMessage>
            <label>
              <Text
                as="div"
                weight={"bold"}
                size={"2"}
                mb={"2"}
              >
                Group Name
              </Text>
              <TextField.Root>
                <TextField.Input
                  defaultValue=""
                  placeholder="Enter your full name"
                  {...register("groupName", { required: true })}
                />
              </TextField.Root>
            </label>
            <ErrorMessage>{errors.groupName?.message}</ErrorMessage>
            <label>
              <Text
                as="div"
                weight={"bold"}
                size={"2"}
                mb={"2"}
              >
                Color
              </Text>
              <TextField.Root>
                <TextField.Input
                  type="color"
                  className="p-0"
                  {...register("color")}
                />
              </TextField.Root>
            </label>
            <Flex
              justify={"end"}
              gap={"2"}
              align={"center"}
            >
              <Dialog.Close>
                <Button
                  color="red"
                  size={"3"}
                  variant="soft"
                  type="button"
                  onClick={() => {
                    reset();
                    setSubmitError("");
                  }}
                >
                  Cancel
                </Button>
              </Dialog.Close>

              <Button
                type="submit"
                size={"3"}
                variant="soft"
                disabled={isCreating}
              >
                Create
                {isCreating && <Spinner />}
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default GroupDialog;
