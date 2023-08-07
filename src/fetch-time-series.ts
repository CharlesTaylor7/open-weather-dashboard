import { Forecast, forecast } from '@/api/weather';
import { RawGeocodingResponse, geocode } from '@/api/geocoding';

export function fetchEightDayForecast(
  city: string,
  state: string,
): Promise<Forecast> {
  return geocode({ q: `${city},${state},US` }).then((location) =>
    forecast(location),
  );
}
