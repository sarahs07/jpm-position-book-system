// Request body types

export interface TradeEvents {
  events: TradeEvent[];
}

export interface TradeEvent {
  id: number;
  action: string;
  account: string;
  security: string;
  quantity: number;
}

// Response body types

export interface TradePositions {
  positions: TradePosition[];
}

export interface TradePosition {
  account: string;
  security: string;
  quantity: number;
  events: TradeEvent[];
}

export enum eventAction {
  "SELL" = "SELL",
  "BUY" = "BUY",
  "CANCEL" = "CANCEL",
}
