import { fetchFromOpenWeatherApi } from "@/api/base";

type GeocodingQuery = {
  q: string;
  limit: number;
};

// https://api.openweathermap.org/geo/1.0/direct?q=chattanooga,TN,US&limit=5&appid={appid}&lang=en
export function geocode(
  query: GeocodingQuery,
  signal: AbortSignal,
): Promise<GeocodingResponse> {
  return fetchFromOpenWeatherApi({
    options: { signal },
    route: "/geo/1.0/direct",
    query: {
      lang: "en",
      ...query,
    },
  }) as Promise<GeocodingResponse>;
}

export type GeocodingResponse = Array<CityLocation>;

export type CityLocation = {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
};
