import { TradePositions } from "@/pages/api/events-positions-types";
import Link from "next/link";
import React from "react";

export default function Navbar({}) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/position-summary">Position Summary</Link>
          </li>
          <li>
            <Link href="/event-form">Create Event</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
