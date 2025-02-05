"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { socket } from "../helper/socket";
import { Socket } from "socket.io-client";
import { VscClose } from "react-icons/vsc";
import { Button, Flex } from "@radix-ui/themes";
import toast from "react-hot-toast";
import IssueNotiLayout from "../components/IssueNotiLayout";
import { priorityMap, statusMap } from "../NavBar";
import Link from "next/link";

type SocketContextType = {
  socketState: Socket | null;
  isConnected: boolean;
};

export const StoreSocket = createContext<SocketContextType>({
  socketState: null,
  isConnected: false,
});

export const useSocket = () => {
  const context = useContext(StoreSocket);
  if (!context) {
    throw new Error("useSocket must be use within a SocketProvider");
  }

  return context;
};

const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socketState, setSocketState] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("noti-assign-issue", (issue) => {
      console.log(issue);
      console.log(1);
    });
    socket?.on("notify-new-issue", async (noti) => {
      toast.custom(
        (t) => (
          <Flex
            className="bg-white p-2 shadow-md "
            align={"center"}
            gap={"3"}
          >
            <Link
              className=""
              href={`/issues/${noti.issueId}`}
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
                markAsRead={noti.markAsRead}
                id={noti.id}
                userId={noti.userId}
                receiver={noti.receiver}
              />
            </Link>

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
        { id: "notiItem", duration: 5000 }
      );
    });
    setSocketState(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <StoreSocket.Provider
      value={{
        socketState,
        isConnected,
      }}
    >
      {children}
    </StoreSocket.Provider>
  );
};

export default SocketProvider;
