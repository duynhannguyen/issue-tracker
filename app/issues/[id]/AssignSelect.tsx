"use client";
import { Skeleton } from "@/app/components";
import { socket } from "@/app/helper/socket";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
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
  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      const handleAssign = async () => {
        await axios.patch(`/api/issue/${issue.id}`, {
          assignedToUserId: userId === "unassigned" ? null : userId,
        });
        socket.emit("assign-to-user", { userId, issue });
      };
      toast.promise(
        handleAssign(),
        {
          loading: "Assigning...",
          success: "Assign successfully",
          error: "Assign could not be changes",
        },
        { id: "assignIssue" }
      );
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

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
    </>
  );
};

export default AssignSelect;
