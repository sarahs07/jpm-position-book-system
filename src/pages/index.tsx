import React, { useEffect, useState } from "react";
import { buySingleSecurity } from "./mocks/trade-events-mocks";

export default function index() {
  useEffect(() => {
    fetch("http://localhost:3000/api/events", {
      method: "POST",
      body: JSON.stringify(buySingleSecurity),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return <div>index</div>;
}
