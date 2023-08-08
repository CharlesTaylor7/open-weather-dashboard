export default class WeatherDashboard {
  readonly cities: Array<City> = [];
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
}

export type View = 'chart' | 'table';
export type City = {
  label: string;
  data: Array<{
    date: Date;
    temperature: number;
  }>;
};

// This type magic grabs every property of a class that isn't a method.
// This allows me to use typechecked "keyword argument" style initialization.
// e.g.
// new WeatherDashboard({ cities: [], forecastDays: 3, view: 'table' })
type Fields<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
