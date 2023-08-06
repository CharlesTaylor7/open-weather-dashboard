const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org';

type ApiParams = {
  route: string;
  query: Record<string, number | string>;
};

type Query = Record<string, number | string>;

export function fetchFromOpenWeatherApi({
  route,
  query,
}: ApiParams): Promise<any> {
  query = { appid: OPEN_WEATHER_API_KEY, ...query };
  return fetch(`${OPEN_WEATHER_BASE_URL}${route}${toQueryString(query)}`);
}

function toQueryString(query: Query) {
  const params = Object.entries(query)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  return `?${params}`;
}
