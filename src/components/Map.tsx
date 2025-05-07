import { useId, useEffect, useRef, useCallback } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { Coordinates, useAppState } from "@/store";
import { getReverseGeocoding } from "@/api/geocoding";
import { getForecast } from "@/api/weather";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-expect-error vite patch icons
delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map() {
  const { locations } = useAppState();
  const addLocation = useMapLocation();

  const mapId = useId();
  const mapRef = useRef<Leaflet.Map | null>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || locations.length === 0) return;

    const last = locations[locations.length - 1];
    const group = Leaflet.layerGroup(
      locations.map(({ label, coordinates: { lat, lon } }) =>
        Leaflet.marker({ lat, lng: lon }).bindPopup(label!).openPopup(),
      ),
    ).addTo(map);
    map.flyTo(
      {
        lat: last.coordinates.lat,
        lng: last.coordinates.lon,
      },
      13,
      {
        duration: 1,
      },
    );

    return () => void group.remove();
  }, [mapRef, locations]);

  useEffect(() => {
    const map = Leaflet.map(mapId).setView([51.505, -0.09], 13);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.on("click", (e) => {
      addLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    });

    mapRef.current = map;
    return () => void map.remove();
  }, [addLocation, mapId]);

  return <div id={mapId} style={{ height: "400px", width: "100%" }}></div>;
}

function useMapLocation() {
  const { addLocation, setLabel, saveForecast } = useAppState();
  const abortControllerRef = useRef(new AbortController());
  return useCallback(
    (coordinates: Coordinates) => {
      addLocation({ coordinates });
      Promise.all([
        getReverseGeocoding(
          coordinates,
          abortControllerRef.current.signal,
        ).then((response) => {
          setLabel({ label: response[0].name, coordinates });
        }),
        getForecast(coordinates, abortControllerRef.current.signal).then(
          (forecast) => {
            saveForecast(coordinates, forecast);
          },
        ),
      ]);
    },
    [addLocation, setLabel, saveForecast],
  );
}
