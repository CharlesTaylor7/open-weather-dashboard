import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
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
function noOp() {}

export default function CitySearch() {
  const { appendForecast } = useAppState();
  const [rawQuery, setQuery] = useState("");
  const query = useDeferredValue(rawQuery);
  const mapRef = useRef<Leaflet.Map | null>(null);

  const [citySelection, setRawCitySelection] = useState<CitySelection | null>(
    null,
  );
  const setCitySelection = useCallback(
    (city: CitySelection | null) => {
      setRawCitySelection(city);
      const map = mapRef.current;
      let marker: Leaflet.Marker | null = null;
      if (map && city) {
        map.flyTo([city.lat, city.lon], 13, {
          duration: 1, // Animation duration in seconds
        });
        marker = Leaflet.marker([city.lat, city.lon]).addTo(map);
        if (city.label) {
          marker.bindPopup(city.label).openPopup();
        }
      }
    },
    [mapRef],
  );

  const geocoding = useQuery({
    enabled: query.length > 0 && !citySelection,
    queryKey: ["geocode", query],
    queryFn: ({ signal }) => geocode({ q: query, limit: 5 }, signal),
  });

  useQuery({
    enabled: !!citySelection && citySelection.label == null,
    queryKey: ["geocode", query],
    queryFn: ({ signal }) =>
      reverseGeocode(citySelection!, signal).then((data) => {
        setCitySelection(data[0]);
        return data;
      }),
  });
  const cityForecast = useQuery({
    enabled: !!citySelection && citySelection.label != null,
    queryKey: ["forecast", citySelection],
    queryFn: async ({ signal }) => {
      if (!citySelection) return;
      const forecastData = await forecast(citySelection, signal);
      appendForecast({ label: citySelection.label!, forecast: forecastData });
      setQuery("");
      setCitySelection(null);
    },
  });

  const error =
    geocoding.data?.length === 0
      ? "No matching location; double check your spelling?"
      : geocoding.error?.message;

  return (
    <>
      <Map ref={mapRef} />
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
      {!citySelection && geocoding.data?.length ? (
        <div className="flex flex-col gap-3">
          {geocoding.data.map((city, i) => (
            <button
              className="btn btn-primary"
              key={i}
              onClick={() => {
                const label = cityLabel(city);
                setCitySelection({ ...city, label });
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
  ref: React.RefObject<Leaflet.Map | null>;
  onClick?: (event: Coordinates) => void;
}
function Map({ ref, onClick = noOp }: MapProps) {
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

    ref.current = map;
    return () => {
      map.remove();
    };
  }, [ref, mapId, onClick]);

  return <div id={mapId} style={{ height: "400px", width: "100%" }}></div>;
}
