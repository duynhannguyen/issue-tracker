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
