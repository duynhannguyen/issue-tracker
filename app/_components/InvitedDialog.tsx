import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { UserPlus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { inviteMemberSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { inviteMember } from "../actions/inviteMember";
import { useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const InvitedDialog = () => {
  const params = useSearchParams();
  const group = params.get("group");
  const { handleSubmit, register, reset, watch } = useForm<
    z.infer<typeof inviteMemberSchema>
  >({
    resolver: zodResolver(inviteMemberSchema),
  });
  const showSuggestUser = useDebounce((inputValue) => {
    console.log(inputValue);
  });
  useEffect(() => {
    const watchEmail = watch((emailValue) => {
      showSuggestUser(emailValue);
    });

    return () => watchEmail.unsubscribe();
  }, [watch, showSuggestUser]);
  if (!group) {
    return null;
  }
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    await inviteMember(formData);
  });

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
          <form onSubmit={onSubmit}>
            <Flex
              gap={"2"}
              justify={"between"}
            >
              <TextField.Root className="flex-grow ">
                <TextField.Input
                  {...register("email", { required: true })}
                  placeholder="Email address"
                  title="email-member"
                />
              </TextField.Root>
              <Button>Invite</Button>
            </Flex>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default InvitedDialog;
