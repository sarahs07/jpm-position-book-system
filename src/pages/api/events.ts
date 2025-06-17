// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  eventAction,
  TradeEvent,
  TradePositions,
} from "./events-positions-types";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io: IOServer;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const io = new IOServer(res.socket.server);
  let result: TradePositions | [] = [];
  if (req.body) {
    result = getPositions(req.body);
    // Emitting to client with updated positions data
    res.socket.server.io.emit("update-input", result);
    res.status(201).json(result);
  }
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Initializing socket server");
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected");
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
}

function getPositions(payload: string): TradePositions {
  const result: TradePositions = { positions: [] };
  const events: TradeEvent[] = JSON.parse(payload);
  const positionsMap = new Map();

  events.forEach((event: TradeEvent) => {
    let { account, action, security, quantity } = event;
    let eventKey = `${account}-${security}`;

    if (positionsMap.has(eventKey)) {
      let position = positionsMap.get(eventKey);
      position.quantity = updateQuantity(action, position.quantity, quantity);
      position.events.push(event);
    } else {
      positionsMap.set(eventKey, {
        account,
        security,
        quantity,
        events: [{ ...event }],
      });
    }
  });

  positionsMap.forEach((position) => {
    result.positions.push(position);
  });

  return result;
}

function updateQuantity(
  action: string,
  currentQuanity: number,
  quantity: number
): number {
  if (action === eventAction.BUY) {
    currentQuanity += quantity;
  } else if (action === eventAction.SELL) {
    currentQuanity -= quantity;
  } else if (action === eventAction.CANCEL) {
    currentQuanity = 0;
  }
  return currentQuanity;
}
