const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org';

type ApiCall = {
  route: string;
  query: Query;
};

type Query = Record<string, number | string>;

export function fetchFromOpenWeatherApi(apiCall: ApiCall): Promise<object> {
  const { route, query } = apiCall;
  const queryWithApiKey = { appid: OPEN_WEATHER_API_KEY, ...query };

  return fetch(
    `${OPEN_WEATHER_BASE_URL}${route}${toQueryString(queryWithApiKey)}`,
  );
}

function toQueryString(query: Query) {
  const params = Object.entries(query)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  return `?${params}`;
}
