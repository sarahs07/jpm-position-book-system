// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TradePositions } from "./events-positions-types";
import { outputEventsResponse } from "./events-mock-responses";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TradePositions>
) {
  res.status(200).json(outputEventsResponse);
}
