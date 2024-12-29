"use client";

import {
  Avatar,
  Badge,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
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
import formatDate from "./helper/formatDate";

type IssueNoti = {
  eventKind: "Issue";
  action: "Create" | "Update" | "Delete" | "Change";
  content: string;
  priority?: Priority;
  status?: Status;
  time?: Date;
};
type AccountNoti = {
  eventKind: "Account";
  action: "Create" | "Update" | "Delete" | "Change";
  content: string;
  time?: Date;
};

type NotificationItem = IssueNoti | AccountNoti;

type NotificationBoxProps = {
  notifications: NotificationItem[];
};
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

const test: NotificationItem[] = [
  {
    eventKind: "Issue",
    action: "Create",
    content: "New bug reported in login system",
    priority: Priority.HIGH,
    status: Status.OPEN,
    time: new Date("2024-01-15T10:30:00"),
  },
  {
    eventKind: "Issue",
    action: "Create",
    content: "New bug reported in login system",
    priority: Priority.HIGH,
    status: Status.OPEN,
    time: new Date("2024-01-15T10:30:00"),
  },
  {
    eventKind: "Issue",
    action: "Create",
    content: "New bug reported in login system",
    priority: Priority.HIGH,
    status: Status.OPEN,
    time: new Date("2024-01-15T10:30:00"),
  },
  {
    eventKind: "Account",
    action: "Update",
    content: "User profile updated: John Doe",
    time: new Date("2024-01-15T11:00:00"),
  },
  {
    eventKind: "Issue",
    action: "Update",
    content: "Performance issue status changed",
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS,
    time: new Date("2024-01-15T14:20:00"),
  },
  {
    eventKind: "Account",
    action: "Delete",
    content: "Account deleted: jane@example.com",
    time: new Date("2024-01-15T15:45:00"),
  },
  {
    eventKind: "Issue",
    action: "Change",
    content: "Security vulnerability found",
    priority: Priority.HIGH,
    status: Status.OPEN,
    time: new Date("2024-01-15T16:30:00"),
  },
  {
    eventKind: "Account",
    action: "Create",
    content: "New account created: mary@example.com",
    time: new Date("2024-01-15T17:00:00"),
  },
  {
    eventKind: "Issue",
    action: "Delete",
    content: "Removed duplicate bug report",
    priority: Priority.LOW,
    status: Status.CLOSED,
    time: new Date("2024-01-15T18:15:00"),
  },
  {
    eventKind: "Account",
    action: "Change",
    content: "Role updated: admin privileges granted",
    time: new Date("2024-01-15T19:30:00"),
  },
  {
    eventKind: "Issue",
    action: "Create",
    content: "New feature request submitted",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
    time: new Date("2024-01-15T20:45:00"),
  },
  {
    eventKind: "Account",
    action: "Update",
    content: "Password reset requested",
    time: new Date("2024-01-15T21:00:00"),
  },
];

const NavBar = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket", socket.id);
    });
    socket.emit("sendmsg", "hello");
  }, []);
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
            <NotificationBox notifications={test} />
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

const NotificationBox = ({ notifications }: NotificationBoxProps) => {
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

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Bell size={18} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-96 h-[400px]">
        {notifications.length === 0 && (
          <Text
            size={"1"}
            className="p-4"
            as="div"
          >
            Notification Box is empty
          </Text>
        )}
        {notifications.map((noti, index) => (
          <div key={index}>
            <Text
              size={"2"}
              as="div"
              className="p-2 hover:bg-gray-100 transition-all 0.5s ease-in-out text-pretty	"
            >
              {noti.eventKind === "Issue" && (
                <Flex
                  direction={"column"}
                  gap={"2"}
                >
                  <Flex justify={"between"}>
                    {noti.status && (
                      <Badge
                        size="1"
                        color={statusMap[noti.status].color}
                      >
                        Status: {statusMap[noti.status].label}
                      </Badge>
                    )}

                    {noti.priority && (
                      <Badge color={priorityMap[noti.priority].color}>
                        Priority: {priorityMap[noti.priority].label}
                      </Badge>
                    )}
                  </Flex>
                  <Text as="div">
                    The Issue{" "}
                    <Badge
                      className="w-fit"
                      color="gray"
                    >
                      {noti.content}
                    </Badge>
                    {noti.action !== "Change" && ` has been ${noti.action} `}
                    {noti.action === "Change" &&
                      `has been changed to ${noti.status || noti.priority}`}
                  </Text>
                  <Text
                    size="1"
                    as="div"
                    className="text-gray-400"
                  >
                    {noti.time && formatDate(noti.time)}
                  </Text>
                </Flex>
              )}
            </Text>
          </div>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
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
