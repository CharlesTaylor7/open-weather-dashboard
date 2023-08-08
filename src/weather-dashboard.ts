export default class WeatherDashboard {
  readonly cities: Array<CityForecast> = [];
  //readonly cityQueryResult: CityQueryResult = { type: 'no-active-query' };
  readonly view: View = 'chart';
  readonly forecastDays: number = 3;

  constructor(fields?: Fields<WeatherDashboard>) {
    if (fields !== undefined) {
      Object.assign(this, fields);
    }
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

  appendCity(city: CityForecast): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      cities: [...this.cities, city],
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

  allCityTimeSeries(): Array<TimeSeries> {
    return this.cities.map((city) => ({
      name: city.label,
      data: city.data.map((d) => ({
        x: d.datetime.toISOString(),
        y: d.temperature,
      })),
    }));
  }

  searchForCity(text: string) {}
}

export type View = 'chart' | 'table';

export type CityForecast = {
  label: string;
  data: Array<{
    datetime: Date;
    temperature: number;
  }>;
};

/* TODO: consider
export class City {
  city: string;
  state: string;
  country: string;
  data: Array<{
    date: Date;
    temperature: number;
  }>;
};
*/
/*
export type CityQueryResult =
  | { type: 'no-active-query' }
  | {
      type: 'error';
    }
  | {
      type: 'loading';
    }
  | {
      type: 'geocoding';
      cities: Array<{}>;
    };
*/

export type TimeSeries = {
  name: string;
  data: Array<{ x: string; y: number }>;
};

// This type magic grabs every property of a class that isn't a method.
// This allows me to use typechecked "keyword argument" style initialization.
// e.g.
// new WeatherDashboard({ cities: [], forecastDays: 3, view: 'table' })
type Fields<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
