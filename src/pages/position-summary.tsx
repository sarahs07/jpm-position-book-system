import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { TradePosition, TradePositions } from "./api/events-positions-types";
import { columns } from "../constants";

let socket;

export default function PositionSummary({
  positions,
}: {
  positions: TradePosition[] | [];
}) {
  const getRowId = (row: TradePosition) => {
    return `${row.account}-${row.security}`;
  };

  return (
    <>
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
