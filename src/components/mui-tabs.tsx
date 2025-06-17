import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import CreateEventForm from "@/pages/event-form";
import { TradePosition } from "@/pages/api/events-positions-types";
import PositionSummary from "@/pages/position-summary";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function MuiTabs({
  positions,
}: {
  positions: TradePosition[] | [];
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%", justifyContent: "center" }}>
      <Tabs
        style={{ justifyContent: "center" }}
        value={tabIndex}
        onChange={handleChange}
        aria-label="Positions Summary and Forms tabs"
        centered
      >
        <Tab label="Position Summary" />
        <Tab label="Create Event" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <PositionSummary positions={positions} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <CreateEventForm />
      </TabPanel>
    </Box>
  );
}
