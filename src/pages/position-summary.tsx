import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { TradePosition } from "./api/events-positions-types";
import Navbar from "@/pages/components/shared/nav-bar";
import { columns } from "./constants";
import { io } from "socket.io-client";
import useSocket from "./hooks/useSocket";

let socket;

export default function PositionSummary() {
  const [positions, setPositions] = useState([]);

  const getRowId = (row: TradePosition) => {
    return `${row.account}-${row.security}`;
  };

  useEffect(() => socketInitializer(), []);

  const socketInitializer = () => {
    fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected to web socket api");
    });

    socket.on("update-input", (msg) => {
      console.log(msg);
    });

    socket.emit("input-change", "hi");
  };

  return (
    <>
      <Navbar />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={getRowId}
          rows={positions}
          columns={columns}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
