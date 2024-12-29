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
import { Bell } from "lucide-react";
import { Status } from "@prisma/client";
import { useEffect } from "react";
import { socket } from "./helper/socket";

type NotificationProps = {
  content: string;
  status: Status;
};
type NotificationBoxProps = {
  notifications: NotificationProps[];
};
const test: NotificationProps[] = [
  { content: "Your account settings have been updated.", status: Status.OPEN },
  { content: "Payment failed, please try again.", status: Status.IN_PROGRESS },
  {
    content: "Your subscription has been successfully renewed.",
    status: Status.CLOSED,
  },
  { content: "New message from support team.", status: Status.OPEN },
  {
    content: "Server maintenance scheduled for tonight.",
    status: Status.CLOSED,
  },
  {
    content: "Profile photo uploaded successfully.",
    status: Status.IN_PROGRESS,
  },
  { content: "You have a new friend request.", status: Status.OPEN },
  { content: "Order #1234 has been shipped.", status: Status.CLOSED },
  { content: "Password reset request received.", status: Status.IN_PROGRESS },
  { content: "Welcome to our platform!", status: Status.OPEN },
];

const NavBar = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket", socket.id);
      console.log(1);
      // const a = {
      //   content: "Your account settings have been updated.",
      //   status: Status.OPEN,
      // };
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

type StatusMap = Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
>;

const NotificationBox = ({ notifications }: NotificationBoxProps) => {
  const statusMap: StatusMap = {
    OPEN: { label: "OPEN", color: "red" },
    IN_PROGRESS: { label: "IN_PROGRESS", color: "violet" },
    CLOSED: { label: "CLOSED", color: "green" },
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Bell size={18} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {notifications.length === 0 && (
          <Text
            size={"1"}
            className="p-4"
          >
            Notification Box is empty
          </Text>
        )}
        {notifications.map((noti, index) => (
          <div key={index}>
            <Text
              size={"2"}
              as="p"
              className="p-2 hover:bg-gray-100 transition-all 0.5s ease-in-out text-pretty	"
            >
              Issue <Badge color="gray">{noti.content}</Badge> has been{" "}
              <Badge color={statusMap[noti.status].color}>
                {" "}
                {statusMap[noti.status].label}{" "}
              </Badge>
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
