import { fetchFromOpenWeatherApi } from '@/api/base';

type GeocodingQuery = {
  q: string;
  limit?: number;
  lang?: string;
};

// This type lists only fields of the api response that we are parsing.
// The actual response type is quite large
export type RawGeocodingResponse = {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
};

// https://api.openweathermap.org/geo/1.0/direct?q=chattanooga,TN,US&limit=5&appid={appid}&lang=en
export function geocode(query: GeocodingQuery): Promise<RawGeocodingResponse> {
  return fetchFromOpenWeatherApi({
    route: '/geo/1.0/direct',
    query: {
      lang: 'en',
      limit: 1,
      ...query,
    },
  }) as Promise<RawGeocodingResponse>;
}
