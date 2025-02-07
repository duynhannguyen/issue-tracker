"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createGroupSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/app/components";
const Groups = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      groupName: "",
      color: "#ffb300c2",
    },
    mode: "onSubmit",
  });
  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
  });

  return (
    <div>
      <p className="font-semibold mb-2">YOUR GROUPS</p>
      <Dialog.Root onOpenChange={(open) => open && reset()}>
        <Dialog.Trigger>
          <button className=" bg-slate-400/30 rounded-lg text-gray-500 font-semibold p-1  h-20 w-52 hover:bg-primary transition-colors  ">
            Create new group
          </button>
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
              <Dialog.Close>
                <Button
                  color="red"
                  size={"3"}
                  variant="soft"
                  type="button"
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
              </Dialog.Close>

              <Button
                type="submit"
                size={"3"}
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
