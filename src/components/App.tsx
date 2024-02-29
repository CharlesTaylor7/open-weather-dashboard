import { useState } from "react";
import { DashboardContext, initialState } from "@/useDashboardState";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function App() {
  const stateHook = useState(initialState);
  return (
    <DashboardContext.Provider value={stateHook}>
      <WeatherDashboard />
    </DashboardContext.Provider>
  );
}
