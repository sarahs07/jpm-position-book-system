import React, { FormEvent } from "react";
import { eventAction, TradeEvent } from "./api/events-positions-types";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

export default function CreateEventForm() {
  const [events, setEvents] = React.useState<TradeEvent[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const newEvent = mapFormValues(formData);
    setEvents((prev) => [...prev, newEvent]);

    if (!apiURL) {
      setErrorMessage("API URL not configured in environment.");
      return;
    }

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      setSuccessMessage("Event submitted successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while submitting the form.");
    }
  };

  function mapFormValues(formData: FormData): TradeEvent {
    return {
      id: Date.now(),
      account: (formData.get("account") as string) || "",
      action: (formData.get("action") as string) || "",
      security: (formData.get("security") as string) || "",
      quantity: parseInt(formData.get("quantity") as string) || 0,
    };
  }

  const actions = Object.values(eventAction).filter(
    (v) => typeof v === "string"
  );

  return (
    <div className="container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <select name="action" required>
          {actions.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </select>

        <input type="text" name="account" placeholder="Account" required />
        <input type="text" name="security" placeholder="Security" required />
        <input type="number" name="quantity" placeholder="Quantity" required />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}
