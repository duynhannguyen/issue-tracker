"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createGroupSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/app/components";
import axios from "axios";
import { useSession } from "next-auth/react";
const Groups = () => {
  const session = useSession();
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
  const onSubmit = handleSubmit(async (data) => {
    try {
      const creatingGroup = await axios.post("/api/groups", data);
    } catch (error) {
      console.log(error);
    }
  });
  console.log("errors", errors);
  return (
    <div>
      <p className="font-semibold mb-2">YOUR GROUPS</p>
      <Dialog.Root onOpenChange={(open) => open && reset()}>
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
              <Button
                color="red"
                size={"3"}
                variant="soft"
                type="button"
                onClick={() => reset()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size={"3"}
                variant="soft"
              >
                Create
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Groups;
