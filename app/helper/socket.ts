"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 2000,
  autoConnect: false,
});
