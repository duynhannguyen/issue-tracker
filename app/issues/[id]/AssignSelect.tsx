"use client";
import { Skeleton } from "@/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const AssignSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issue/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

  if (error) return null;
  if (isLoading) return <Skeleton />;

  return (
    <>
      <Select.Root
        defaultValue={
          issue.assignedToUserId === null
            ? "unassigned"
            : issue.assignedToUserId
        }
        onValueChange={(userId) => assignIssue(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((item) => (
              <Select.Item
                key={item.id}
                value={item.id}
              >
                {item.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssignSelect;
