import { fetchFromOpenWeatherApi } from '@/api/base';

///data/3.0/onecall?lat=35&lon=-85&appid=32462e94fa616cc6f77157cc3c965959&lang=en
type ForecastQuery = {
  lat: number;
  lon: number;
  lang?: string;
  units?: 'imperial' | 'metric';
};

// We only need an array of time against temperature to build a chart
export type Forecast = Array<{
  timestamp: Date;
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

export function forecast(query: ForecastQuery): Promise<Forecast> {
  let response;

  if (process.env.NODE_ENV === 'production') {
    response = rawForecast(query);
  } else {
    // local development uses localstorage to prevent excessive calls to the API
    // stale data doesn't matter in a local dev context
    // 7 day forecast is only free for the first 1000 calls each day.
    response = rawForecastWithLocalStorage(query);
  }

  return response.then((forecast) =>
    forecast.daily.map((raw) => ({
      timestamp: new Date(1000 * raw.dt),
      temperature: raw.temp.day,
    })),
  );
}

async function rawForecastWithLocalStorage(
  query: ForecastQuery,
): Promise<RawForecast> {
  const storageKey = `open-weather-forecast-${JSON.stringify(query)}`;
  let forecastData = localStorage.getItem(storageKey);
  if (forecastData === null) {
    const forecast = await rawForecast(query);
    forecastData = JSON.stringify(forecast);
    localStorage.setItem(storageKey, forecastData);
  }
  return JSON.parse(forecastData);
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
