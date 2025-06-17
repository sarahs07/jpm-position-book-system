import { useEffect, useState } from "react";
import Navbar from "../components/nav-bar";
import { io } from "socket.io-client";
import PositionSummary from "./position-summary";
import CreateEventForm from "./event-form";

let socket;

export default function index() {
  const [positionsData, setPositionsData] = useState([]);

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
      <div className="container">
        <PositionSummary positions={positionsData} />
        <CreateEventForm />
      </div>
    </>
  );
}
