import { fetchFromOpenWeatherApi } from '@/api/base';

///data/3.0/onecall?lat=35&lon=-85&appid=32462e94fa616cc6f77157cc3c965959&lang=en
type ForecastQuery = {
  lat: number;
  lon: number;
  lang?: string;
  units?: 'imperial' | 'metric';
};

// IDEA: include feels_like / humidity

// We only need an array of these to build a chart
type Forecast = Array<{
  dt: number;
  temp: number;
}>;

// This type lists only fields of the api response that we are parsing into the forecast response. The actual response type is quite large
type RawForecast = {
  hourly: Array<{
    dt: number;
    temp: number;
  }>;
};

export function forecast(query: ForecastQuery): Promise<Forecast> {
  return rawForecast(query).then((forecast) => forecast.hourly);
}

function rawForecast(query: ForecastQuery): Promise<RawForecast> {
  return fetchFromOpenWeatherApi({
    route: '/data/3.0/onecall',
    query: {
      lang: 'en',
      units: 'imperial',
      ...query,
    },
  }) as Promise<RawForecast>;
}
