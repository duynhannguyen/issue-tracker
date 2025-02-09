"use client";

import { Skeleton } from "@/app/components";
import { IssueNoti, Priority, Status } from "@prisma/client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import { Bell, SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { FaBug } from "react-icons/fa6";
import IssueNotiLayout from "./components/IssueNotiLayout";
import IssueNotiSkeleton from "./components/IssueNotiSkeleton";
import { useSocket } from "./socket/SocketProvider";

type AccountNoti = {
  eventKind: "Account";
  action: "Create" | "Update" | "Delete" | "Change";
  content: string;
  time?: Date;
};

type NotificationItem = IssueNoti | AccountNoti;

type StatusMap = Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
>;

type PriorityMap = Record<
  Priority,
  {
    label: string;
    color: "red" | "violet" | "green";
    icon: JSX.Element;
  }
>;
export const statusMap: StatusMap = {
  OPEN: { label: "OPEN", color: "red" },
  IN_PROGRESS: { label: "IN_PROGRESS", color: "violet" },
  CLOSED: { label: "CLOSED", color: "green" },
};

export const priorityMap: PriorityMap = {
  HIGH: { label: "HIGH", color: "red", icon: <SignalHigh size={24} /> },
  MEDIUM: {
    label: "MEDIUM",
    color: "violet",
    icon: <SignalMedium size={24} />,
  },
  LOW: { label: "LOW", color: "green", icon: <SignalLow size={24} /> },
};
const NavBar = () => {
  return (
    <nav className=" space-x-6 border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify={"between"}>
          <Flex
            align={"center"}
            gap={"3"}
          >
            <Link href="/">
              {" "}
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <Flex
            align={"center"}
            gap={"3"}
          >
            <NotificationBox />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/dashboard/groups" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6 ">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-slate-300": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const NotificationBox = () => {
  const router = useRouter();
  const { socketState } = useSocket();
  const { data: session } = useSession();
  const {
    data: notiIssue,
    isLoading,
    error,
    refetch,
  } = useQuery<NotificationItem[]>({
    queryKey: ["issueNoti", session?.user.id],
    queryFn: async () =>
      await axios.get(`/api/noti/${session?.user.id}`).then((res) => res.data),
    staleTime: 60 * 1000,
    enabled: !!session?.user.id,
  });
  const handleMarkNotiAsRead = async ({
    id,
    isRead,
  }: {
    id: number;
    isRead: boolean;
  }) => {
    try {
      if (isRead) {
        return;
      }
      const markingNoti = await axios.patch(`/api/noti/${id}`, {
        id,
        isRead,
      });
      refetch();
    } catch (error) {
      throw new Error();
    }
  };

  const unreadNoti = notiIssue?.filter(
    (noti) => noti.eventKind === "ISSUE" && noti.markAsRead === false
  );

  if (error) return null;
  return (
    <>
      <DropdownMenu.Root
        onOpenChange={(open) => {
          if (open) {
            refetch();
          }
        }}
      >
        <DropdownMenu.Trigger>
          <div className="relative transition-all ease-in-out ">
            {unreadNoti && unreadNoti.length > 0 ? (
              <div className=" absolute -right-1 -top-2 bg-red-500 h-4 w-4 rounded-full text-[9px] font-semibold text-white leading-4 text-center ">
                <div className="">
                  {unreadNoti?.length >= 10 ? "9+" : unreadNoti?.length}
                </div>
              </div>
            ) : null}
            <Bell
              size={24}
              className="cursor-pointer hover:text-gray-400 transition-colors ease-in-out  "
            />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-96 ">
          {isLoading ? (
            <IssueNotiSkeleton />
          ) : (
            <>
              {error ? (
                <Text
                  size={"1"}
                  className="p-4"
                  as="div"
                >
                  Something went wrong, please try again
                </Text>
              ) : null}

              {notiIssue?.map((noti, index) => (
                <div key={index}>
                  <Text
                    size={"2"}
                    as="div"
                    className="p-2 hover:bg-gray-100 transition-all 0.5s ease-in-out text-pretty	"
                  >
                    {noti.eventKind === "ISSUE" && (
                      <div
                        onClick={() => {
                          handleMarkNotiAsRead({
                            id: noti.id,
                            isRead: noti.markAsRead,
                          });
                          router.push(`/issues/${noti.issueId}`);
                        }}
                      >
                        <IssueNotiLayout
                          receiver={noti.receiver}
                          action={noti.action}
                          content={noti.content}
                          eventKind={noti.eventKind}
                          status={noti.status}
                          priority={noti.priority}
                          time={noti.time}
                          notiStatus={statusMap}
                          priorityStatus={priorityMap}
                          issueId={noti.issueId}
                          markAsRead={noti.markAsRead}
                          id={noti.id}
                          userId={noti.userId}
                        />
                      </div>
                    )}
                  </Text>
                </div>
              ))}
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          id: "notiItem",
        }}
      />
    </>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return (
      <button
        className="nav-link"
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/dashboard/groups",
          })
        }
      >
        Login
      </button>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Text>
            <Avatar
              src={session?.user.image!}
              fallback={"?"}
              size={"2"}
              radius="full"
              className="cursor-pointer "
            />
          </Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"2"}>{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Log out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default NavBar;
