"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { VscClose } from "react-icons/vsc";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa6";
import { Skeleton } from "@/app/components";
import { Bell, SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import { Priority, Status } from "@prisma/client";
import { useEffect } from "react";
import { socket } from "./helper/socket";
import IssueNotiLayout from "./components/IssueNotiLayout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type IssueNoti = {
  eventKind: "ISSUE";
  action: "Create" | "Update" | "Delete" | "Change";
  content: string;
  priority?: Priority;
  status?: Status;
  time?: Date;
  issueId: number;
};
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
    { label: "Dashboard", href: "/" },
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
  const {
    data: notiIssue,
    isLoading,
    error,
    refetch,
  } = useQuery<NotificationItem[]>({
    queryKey: ["issueNoti"],
    queryFn: () =>
      axios.get(`/api/noti/${session?.user.id}`).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  useEffect(() => {
    socket.on("notify-new-issue", (noti) => {
      toast.custom(
        (t) => (
          <Flex
            className="bg-white p-2 shadow-md "
            align={"center"}
            gap={"3"}
          >
            <Text
              as="div"
              className="pointer-events-none"
            >
              <IssueNotiLayout
                action={noti.action}
                content={noti.content}
                eventKind={noti.eventKind}
                status={noti.status}
                priority={noti.priority}
                time={noti.time}
                notiStatus={statusMap}
                priorityStatus={priorityMap}
                issueId={noti.issueId}
              />
            </Text>

            <Button
              variant="solid"
              size={"1"}
              onClick={() => toast.dismiss(t.id)}
              color="red"
            >
              <VscClose
                className="text-xs cursor-pointer"
                color="white"
              />
            </Button>
          </Flex>
        ),
        { id: noti.id, duration: 5000 }
      );
    });
  });

  const { data: session } = useSession();

  console.log(notiIssue);
  const statusMap: StatusMap = {
    OPEN: { label: "OPEN", color: "red" },
    IN_PROGRESS: { label: "IN_PROGRESS", color: "violet" },
    CLOSED: { label: "CLOSED", color: "green" },
  };

  const priorityMap: PriorityMap = {
    HIGH: { label: "HIGH", color: "red", icon: <SignalHigh size={24} /> },
    MEDIUM: {
      label: "MEDIUM",
      color: "violet",
      icon: <SignalMedium size={24} />,
    },
    LOW: { label: "LOW", color: "green", icon: <SignalLow size={24} /> },
  };
  if (error) return null;
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Bell size={18} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-96 ">
          {error ? (
            <Text
              size={"1"}
              className="p-4"
              as="div"
            >
              Something went wrong
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
                  <IssueNotiLayout
                    action={noti.action}
                    content={noti.content}
                    eventKind={noti.eventKind}
                    status={noti.status}
                    priority={noti.priority}
                    time={noti.time}
                    notiStatus={statusMap}
                    priorityStatus={priorityMap}
                    issueId={noti.issueId}
                  />
                )}
              </Text>
            </div>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return (
      <Link
        className="nav-link"
        href={"/api/auth/signin"}
      >
        Login
      </Link>
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
            <Link href={"/api/auth/signout"}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default NavBar;
