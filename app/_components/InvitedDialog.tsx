import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { UserPlus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const InvitedDialog = () => {
  const params = useSearchParams();
  const group = params.get("group");
  if (!group) {
    return null;
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <UserPlus className="cursor-pointer hover:text-gray-400 transition-colors ease-in-out  " />
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Invite Member</Dialog.Title>

        <Flex
          direction="column"
          gap="3"
        >
          <label>
            <Text
              as="div"
              size="2"
              mb="1"
              weight="bold"
            >
              Name
            </Text>
          </label>
          <label>
            <Text
              as="div"
              size="2"
              mb="1"
              weight="bold"
            >
              Email
            </Text>
            <TextField.Root
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>
        </Flex>

        <Flex
          gap="3"
          mt="4"
          justify="end"
        >
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default InvitedDialog;
