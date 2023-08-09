export default class WeatherDashboard {
  readonly cities: Array<CityForecast> = [];
  readonly view: View = 'chart';
  readonly forecastDays: number = 7;
  readonly citySearchTerm: string = '';
  readonly cityQueryResult: CityQueryResult = {type: 'no-active-query'};

  constructor(fields?: Fields<WeatherDashboard>) {
    if (fields !== undefined) {
      Object.assign(this, fields);
    }
  }

  forecasted(): Array<TimeSeries> {
    return this.cities.map((city) => ({
      name: city.label,
      data: city.data
        .map((d) => ({ x: d.datetime, y: d.temperature }))
        .slice(0, this.forecastDays),
    }));
  }

  searchIsDisabled(): boolean {
    return this.citySearchTerm === '' || this.cityQueryResult.type === 'loading'
  }
  
  changeView(view: View): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      view,
    });
  }

  changeForecastDays(forecastDays: number): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      forecastDays,
    });
  }

  removeCity(index: number): WeatherDashboard {
    const copy = Array.from(this.cities);
    // splice deletes and shifts elements in place
    copy.splice(index, 1);
    return new WeatherDashboard({
      ...this,
      cities: copy,
    });
  }

  setSearchTerm(query: string) {
    return new WeatherDashboard({
      ...this,
      citySearchTerm: query,
      cityQueryResult: { type: 'no-active-query' },
    });
  }

  showSearchLoading(): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      cityQueryResult: { type: 'loading' },
    });
  }

  showSearchError(message: string): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      cityQueryResult: { type: 'error', message },
    });
  }

  showSearchOptions(locations: Array<CityLocation>): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      cityQueryResult: { type: 'geocoding', locations },
    });
  }
  
  completeCitySearch(city: CityForecast): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      cities: [...this.cities, city],
      citySearchTerm: '',
      cityQueryResult: { type: 'no-active-query' },
    });
  }
}

export function formatDate(datetime: Date) {
  const month = String(datetime.getMonth() + 1).padStart(2, '0');
  const day = String(datetime.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

type CityQueryResult =
  | { type: 'no-active-query' }
  | {
      type: 'error';
      message: string;
    }
  | {
      type: 'loading';
    }
  | {
      type: 'geocoding';
      locations: Array<CityLocation>;
    };



export type View = 'chart' | 'table';

export type CityForecast = {
  label: string;
  data: Array<{
    datetime: Date;
    temperature: number;
  }>;
};
export type CityLocation = {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
};
export type TimeSeries = {
  name: string;
  data: Array<{ x: Date; y: number }>;
};

// This type magic grabs every property of a class that isn't a method.
// This allows me to use typechecked "keyword argument" style initialization.
// e.g.
// new WeatherDashboard({ cities: [], forecastDays: 3, view: 'table' })
type Fields<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
