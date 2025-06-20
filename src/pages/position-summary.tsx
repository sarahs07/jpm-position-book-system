import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { TradePosition, TradePositions } from "./api/events-positions-types";
import { columns } from "../constants";

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
      <div className="container">
        <DataGrid
          getRowId={getRowId}
          rows={positions}
          columns={columns}
          checkboxSelection
          sx={{ width: "70%" }}
        />
      </div>
    </>
  );
}
