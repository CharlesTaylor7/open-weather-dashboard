import WeatherDashboard from "@/components/WeatherDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherDashboard />
    </QueryClientProvider>
  );
}
