import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "account",
    headerName: "Account",
    headerAlign: "center",
    type: "number",
    width: 150,
    align: "center",
  },
  {
    field: "security",
    headerAlign: "center",
    headerName: "Security",
    type: "number",
    width: 150,
    align: "center",
  },
  {
    field: "quantity",
    headerAlign: "center",
    headerName: "Quantity",
    type: "number",
    width: 150,
    align: "center",
  },
];

export enum eventAction {
  "SELL" = "SELL",
  "BUY" = "BUY",
  "CANCEL" = "CANCEL",
}
