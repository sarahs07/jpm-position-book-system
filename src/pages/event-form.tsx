import React, { FormEvent } from "react";
import { TradeEvent } from "./api/events-positions-types";

export enum eventAction {
  "SELL" = "SELL",
  "BUY" = "BUY",
  "CANCEL" = "CANCEL",
}
const apiURL = "http://localhost:3000/api/events";

export default function CreateEventForm() {
  const events: TradeEvent[] = [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    // TODO: Move handling of data to useState
    events.push(mapFormValues(formData));

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(events),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  function mapFormValues(formData: FormData) {
    return {
      id: parseInt(formData.get("id") as string),
      account: formData.get("account") as string,
      action: formData.get("action") as string,
      security: formData.get("security") as string,
      quantity: parseInt(formData.get("quantity") as string),
    };
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input type="number" name="id" placeholder="ID" required />
          <select name="action">
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
            <option value="CANCEL">CANCEL</option>
          </select>
          <input type="text" name="account" placeholder="Account" required />
          <input type="text" name="security" placeholder="Security" required />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            required
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </>
  );
}
