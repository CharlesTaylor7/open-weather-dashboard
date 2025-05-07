import { useId, useEffect, useRef } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAppState } from "@/store";

export default function Map() {
  const { locations } = useAppState();

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
      console.log({ lat: e.latlng.lat, lon: e.latlng.lng });
    });

    mapRef.current = map;
    return () => void map.remove();
  }, [mapRef, mapId]);

  return <div id={mapId} style={{ height: "400px", width: "100%" }}></div>;
}

//
// const setCitySelection = useCallback(
//   (city: CitySelection | null) => {
//     setRawCitySelection(city);
//     const map = mapRef.current;
//     let marker: Leaflet.Marker | null = null;
//     if (map && city) {
//       map.flyTo([city.lat, city.lon], 13, {
//         duration: 1, // Animation duration in seconds
//       });
//       marker = Leaflet.marker([city.lat, city.lon]).addTo(map);
//       if (city.label) {
//         marker.bindPopup(city.label).openPopup();
//       }
//     }
//   },
//   [mapRef],
// );
//
// useQuery({
//   enabled: !!citySelection && citySelection.label == null,
//   queryKey: ["geocode", query],
//   queryFn: ({ signal }) =>
//     reverseGeocode(citySelection!, signal).then((data) => {
//       setCitySelection(data[0]);
//       return data;
//     }),
// });
