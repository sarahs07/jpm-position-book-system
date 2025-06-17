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
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server...");
    const io = new IOServer(res.socket.server);

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  }

  // Only handle POST with valid body
  if (req.method === "POST" && req.body) {
    const positions = getPositions(req.body);
    res.socket.server.io.emit("update-input", positions);
    return res.status(201).json(positions);
  }

  return res.status(200).end("Socket.IO is running");
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
