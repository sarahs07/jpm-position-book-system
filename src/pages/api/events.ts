// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  eventAction,
  TradeEvent,
  TradePositions,
} from "./events-positions-types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TradePositions>
) {
  let response = getPositions(req.body);
  res.status(201).json(response);
}

function getPositions(payload: string): TradePositions {
  const result: TradePositions = { positions: [] };
  const events: TradeEvent[] = JSON.parse(payload).events;
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
