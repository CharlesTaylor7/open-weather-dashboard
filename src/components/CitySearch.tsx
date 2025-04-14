import { useDeferredValue, useState } from "react";
import SearchIcon from "@/icons/search";
import { forecast } from "@/api/weather";
import { CityLocation, geocode } from "@/api/geocoding";
import { useAppState } from "@/store";
import { useQuery } from "@tanstack/react-query";

export default function CitySearch() {
  const { appendForecast } = useAppState();
  const [rawQuery, setQuery] = useState("");
  const query = useDeferredValue(rawQuery);
  const [location, setLocation] = useState<CityLocation | null>(null);

  const geocoding = useQuery({
    queryKey: ["geocode", query],
    queryFn: ({ signal }) => geocode({ q: query, limit: 5 }, signal),
    enabled: query.length > 0,
  });

  const cityForecast = useQuery({
    queryKey: ["forecast", location],
    queryFn: async ({ signal }) => {
      const result = await forecast(
        { lat: location!.lat, lon: location!.lon },
        signal,
      );
      appendForecast({ label: cityLabel(location!), forecast: result });
      setQuery("");
      setLocation(null);
    },
    enabled: location != null,
  });

  const error =
    geocoding.data?.length === 0
      ? "No matching location; double check your spelling?"
      : geocoding.error?.message;

  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <SearchIcon />
        <input
          placeholder="Search for a city here..."
          className="input input-accent w-full"
          type="text"
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <span>{error}</span>
      {geocoding.isLoading || cityForecast.isLoading ? (
        <span className="loading loading-dots loading-lg" />
      ) : null}
      {geocoding.data?.length ? (
        <div className="flex flex-col gap-3">
          {geocoding.data.map((city, i) => (
            <button
              className="btn btn-primary"
              key={i}
              onClick={() => setLocation(city)}
            >
              {cityLabel(city)}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}

function cityLabel(location: CityLocation) {
  return [location.name, location.state, location.country]
    .filter((term) => term)
    .join(", ");
}
