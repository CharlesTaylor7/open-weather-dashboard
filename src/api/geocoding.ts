import { fetchFromOpenWeatherApi } from "@/api/base";

type GeocodingQuery = {
  q: string;
  limit: number;
};

// https://openweathermap.org/api/geocoding-api#direct_name
export function getGeocoding(
  query: GeocodingQuery,
  signal: AbortSignal,
): Promise<GeocodeResponse> {
  return fetchFromOpenWeatherApi<GeocodeResponse>({
    options: { signal },
    route: "/geo/1.0/direct",
    query: {
      lang: "en",
      ...query,
    },
  });
}

export type GeocodeResponse = Array<WeatherApiLocation>;

export interface WeatherApiLocation {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
}

type ReverseGeocodeQuery = {
  lat: number;
  lon: number;
};

// https://openweathermap.org/api/geocoding-api#reverse
export function getReverseGeocoding(
  query: ReverseGeocodeQuery,
  signal: AbortSignal,
): Promise<ReverseGeocodeResponse> {
  return fetchFromOpenWeatherApi<ReverseGeocodeResponse>({
    options: { signal },
    route: "/geo/1.0/reverse",
    query: {
      lang: "en",
      ...query,
    },
  });
}

type ReverseGeocodeResponse = Array<WeatherApiLocation>;
