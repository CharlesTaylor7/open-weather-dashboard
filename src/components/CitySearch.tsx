import { useCallback, useDeferredValue, useRef, useState } from "react";
import SearchIcon from "@/icons/search";
import { getForecast } from "@/api/weather";
import {
  WeatherApiLocation,
  getGeocoding,
  getReverseGeocoding,
} from "@/api/geocoding";
import { useAppState, type Location } from "@/store";
import { useQuery } from "@tanstack/react-query";

export default function CitySearch() {
  const { saveForecast, addLocation } = useAppState();
  const [rawQuery, setQuery] = useState("");
  const query = useDeferredValue(rawQuery);

  const [location, setLocation] = useState<Location | null>(null);

  const geocoding = useQuery({
    enabled: query.length > 0 && !location,
    queryKey: ["geocode", query],
    queryFn: ({ signal }) => getGeocoding({ q: query, limit: 5 }, signal),
  });

  const cityForecast = useQuery({
    enabled: !!location,
    queryKey: ["forecast", location],
    queryFn: async ({ signal }) => {
      if (!location) return;
      const forecast = await getForecast(location.coordinates, signal);
      saveForecast(location.coordinates, forecast);
      setQuery("");
      setLocation(null);
      return forecast;
    },
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

      {!location && geocoding.data?.length ? (
        <div className="relative w-full">
          <div className="absolute bg-base-300 z-100 w-full shadow-lg">
            <div className="flex flex-col gap-3 items-start">
              {geocoding.data.map((city, i) => (
                <button
                  className="btn btn-primary"
                  key={i}
                  onClick={() => {
                    const label = cityLabel(city);
                    setLocation({ coordinates: city, label });
                    addLocation({ coordinates: city, label });
                  }}
                >
                  {cityLabel(city)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {error && <span>{error}</span>}
      {geocoding.isLoading || cityForecast.isLoading ? (
        <span className="loading loading-dots loading-lg" />
      ) : null}
    </>
  );
}

function cityLabel(location: WeatherApiLocation) {
  return [location.name, location.state, location.country]
    .filter((term) => term)
    .join(", ");
}
