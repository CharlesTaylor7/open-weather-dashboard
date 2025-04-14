import { fetchFromOpenWeatherApi } from "@/api/base";
import type { CityLocation } from "@/store";
import { useQuery } from "@tanstack/react-query";

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
