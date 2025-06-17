// hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Establish WebSocket connection on mount
    socket.current = io(url, {
      path: "/api/socket",
    });

    console.log(">>>socket.current", socket.current);
    socket.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      // Cleanup on unmount
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [url]);

  return socket.current;
};

export default useSocket;
