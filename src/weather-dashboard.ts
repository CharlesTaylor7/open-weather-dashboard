export default class WeatherDashboard {
  readonly cities: Array<City> = [
    'Chattanooga',
    'Knoxville',
    'Cleveland',
    'Atlanta',
  ].map((label) => ({ label, data: [] }));
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

  appendCity(city: City): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      cities: [...this.cities, city],
    });
  }

  allCityTimeSeries(): Array<TimeSeries> {
    return this.cities.map((city) =>
      randomTimeSeries(city.label, this.forecastDays),
    );
  }
}

export type View = 'chart' | 'table';

export type City = {
  label: string;
  data: Array<{
    date: Date;
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

function randomTimeSeries(name: string, length: number): TimeSeries {
  return {
    name,
    data: Array.from({ length }, (_, k) => ({
      x: `01-${k + 1}`,
      y: Math.floor(Math.random() * 100),
    })),
  };
}
