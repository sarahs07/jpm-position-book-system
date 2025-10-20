// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  eventAction,
  TradeEvent,
  TradePosition,
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
      console.log("Client connected", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO server already running");
  }

  // Only handle POST with valid body
  if (req.method === "POST") {
    try {
      console.log("Emitting updated positions:", req.body);
      const positions = getPositions([req.body]);

      res.socket.server.io.emit("update-input", positions);
      return res.status(201).json(positions);
    } catch (e) {
      console.error("Error processing events:", e);
      return res.status(400).end(`Invalid request body ${e}`);
    }
  }

  return res.status(200).end("Socket.IO is running");
}

function getPositions(events: TradeEvent[]): TradePositions {
  const positionsMap = new Map<string, TradePosition>();

  events.forEach((event: TradeEvent) => {
    let { account, action, security, quantity } = event;
    let eventKey = `${account}-${security}`;

    if (positionsMap.has(eventKey)) {
      let position = positionsMap.get(eventKey)!;
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

  return { positions: Array.from(positionsMap.values()) };
}

function updateQuantity(
  action: string,
  currentQuantity: number,
  quantity: number
): number {
  switch (action) {
    case eventAction.BUY:
      currentQuantity += quantity;
    case eventAction.SELL:
      currentQuantity -= quantity;
    case eventAction.CANCEL:
      currentQuantity = 0;
      break;
    default:
      throw new Error(`Invalid action type: ${action}`);
  }
  return currentQuantity;
}
