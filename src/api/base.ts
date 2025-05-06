const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org";

type ApiCall = {
  route: string;
  query: Query;
  options: object;
};

type Query = Record<string, number | string>;

// Note: this api key is embedded in my app for simplicity of keeping this app deployed to github pages
// Since the worst that can happen is my key is stolen; I'm ok with that and won't have to write a backend service just to hide my api key.

const OPEN_WEATHER_API_KEY = "02470d658aee99a90d54f82c91474564";

export function fetchFromOpenWeatherApi<T>(apiCall: ApiCall): Promise<T> {
  const { route, query, options } = apiCall;
  const queryWithApiKey = { appid: OPEN_WEATHER_API_KEY, ...query };

  return fetch(
    `${OPEN_WEATHER_BASE_URL}${route}${toQueryString(queryWithApiKey)}`,
    options,
  ).then((response) => response.json());
}

function toQueryString(query: Query) {
  const params = Object.entries(query)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
  return `?${params}`;
}
