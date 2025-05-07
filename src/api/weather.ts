import { fetchFromOpenWeatherApi } from "@/api/base";

///data/3.0/onecall?lat=35&lon=-85&appid=32462e94fa616cc6f77157cc3c965959&lang=en
export type ForecastQuery = {
  lat: number;
  lon: number;
  units?: "imperial" | "metric";
};

// We only need an array of time against temperature to build a chart
export type Forecast = Array<{
  datetime: Date;
  temperature: number;
}>;

// This type lists only fields of the api response that we are parsing into the forecast response. The actual response type is quite large
type RawForecast = {
  daily: Array<{
    dt: number;
    temp: {
      day: number;
    };
  }>;
};
export function getForecast(
  query: ForecastQuery,
  signal: AbortSignal,
): Promise<Forecast> {
  return rawForecast(query, signal).then((forecast) =>
    forecast.daily.map((raw) => ({
      datetime: new Date(1000 * raw.dt),
      temperature: raw.temp.day,
    })),
  );
}

function rawForecast(
  query: ForecastQuery,
  signal: AbortSignal,
): Promise<RawForecast> {
  return fetchFromOpenWeatherApi<RawForecast>({
    options: { signal },
    route: "/data/3.0/onecall",
    query: {
      lang: "en",
      units: "imperial",
      ...query,
    },
  });
}
