import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import MuiTabs from "@/components/mui-tabs";

export default function index() {
  const [positionsData, setPositionsData] = useState([]);
  let socket = useRef<Socket | null>(null);
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/events"); // Ensures the socket server is initialized
      socket.current = io();

      socket.current.on("connect", () => {
        console.log("Connected to WebSocket API");
      });

      socket.current.on("update-input", (data) => {
        console.log("update-input", data.positions);
        setPositionsData(data.positions);
      });
    };

    socketInitializer();

    // Cleanup on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("Disconnected from WebSocket API");
      }
    };
  }, []); // Empty dependency array ensures this runs once

  return (
    <>
      <MuiTabs positions={positionsData} />
    </>
  );
}
