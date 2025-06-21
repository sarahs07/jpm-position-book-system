import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MuiTabs from "@/components/mui-tabs";

export default function index() {
  const [positionsData, setPositionsData] = useState([]);
  let socket;
  useEffect(() => socketInitializer(), []);

  const socketInitializer = () => {
    fetch("/api/events");
    socket = io();

    socket.on("connect", () => {
      console.log("connected to web socket api");
    });

    // Subscribing to event
    socket.on("update-input", (data) => {
      console.log("update-input", data.positions);
      setPositionsData(data.positions);
    });
  };

  return (
    <>
      <MuiTabs positions={positionsData} />
    </>
  );
}
