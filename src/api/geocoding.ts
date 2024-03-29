import { fetchFromOpenWeatherApi } from "@/api/base";
import type { CityLocation } from "@/weather-dashboard";

type GeocodingQuery = {
  q: string;
  limit: number;
  lang?: string;
};

export type RawGeocodingResponse = Array<CityLocation>;

// https://api.openweathermap.org/geo/1.0/direct?q=chattanooga,TN,US&limit=5&appid={appid}&lang=en
export function geocode(query: GeocodingQuery): Promise<RawGeocodingResponse> {
  return fetchFromOpenWeatherApi({
    route: "/geo/1.0/direct",
    query: {
      lang: "en",
      ...query,
    },
  }) as Promise<RawGeocodingResponse>;
}
