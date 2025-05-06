import { useDeferredValue, useEffect, useId, useState } from "react";
import SearchIcon from "@/icons/search";
import { forecast } from "@/api/weather";
import { CityLocation, geocode, reverseGeocode } from "@/api/geocoding";
import { useAppState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

interface Coordinates {
  lat: number;
  lon: number;
}

interface CitySelection extends Coordinates {
  label?: string;
}

export default function CitySearch() {
  const { appendForecast } = useAppState();
  const [rawQuery, setQuery] = useState("");
  const query = useDeferredValue(rawQuery);

  const [citySelection, setCitySelection] = useState<CitySelection | null>(
    null,
  );

  const geocoding = useQuery({
    queryKey: ["geocode", query],
    queryFn: ({ signal }) => geocode({ q: query, limit: 5 }, signal),
    enabled: query.length > 0,
  });
  const cityForecast = useQuery({
    queryKey: ["forecast", citySelection],
    queryFn: async ({ signal }) => {
      const forecastData = await forecast(citySelection!, signal);
      const label =
        citySelection!.label ||
        (await reverseGeocode(citySelection!, signal).then((data) =>
          cityLabel(data[0]),
        ));
      appendForecast({ label: label!, forecast: forecastData });
      setQuery("");
      setCitySelection(null);
    },
    enabled: citySelection != null,
  });

  const error =
    geocoding.data?.length === 0
      ? "No matching location; double check your spelling?"
      : geocoding.error?.message;

  return (
    <>
      <Map onClick={setCitySelection} />
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
              onClick={() => {
                setCitySelection({ ...city, label: cityLabel(city) });
              }}
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

interface MapProps {
  onClick: (event: Coordinates) => void;
}
function Map({ onClick }: MapProps) {
  const mapId = useId();
  useEffect(() => {
    const map = Leaflet.map(mapId).setView([51.505, -0.09], 13);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.on("click", (e) => {
      onClick({ lat: e.latlng.lat, lon: e.latlng.lng });
    });

    return () => {
      map.remove();
    };
  }, [mapId, onClick]);

  return <div id={mapId} style={{ height: "400px", width: "100%" }}></div>;
}
