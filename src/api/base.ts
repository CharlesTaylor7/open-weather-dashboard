const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org';

type ApiParams = {
  route: string;
  query: Record<string, number | string>;
};

type Query = Record<string, number | string>;

export function fetchFromOpenWeatherApi({
  route,
  query,
}: ApiParams): Promise<object> {
  query = { appid: OPEN_WEATHER_API_KEY, ...query };

  const previousCount = localStorage.getItem('open-weather-api-query-count');
  const count = (Number(previousCount) || 0) + 1;
  if (count >= 500) {
    throw new Error('Exceeded daily query count for Open Weather API');
  }

  localStorage.setItem('open-weather-api-query-count', String(count));
  return fetch(`${OPEN_WEATHER_BASE_URL}${route}${toQueryString(query)}`);
}

function toQueryString(query: Query) {
  const params = Object.entries(query)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  return `?${params}`;
}
