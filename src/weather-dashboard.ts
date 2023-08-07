export default class WeatherDashboard {
  readonly cities: Array<City> = [];
  readonly view: View = 'chart';
  readonly forecastDays: number = 3;

  constructor(fields?: Fields<WeatherDashboard>) {
    if (fields !== undefined) {
      Object.assign(this, fields)
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
    })
  }

  appendCity(city: City): WeatherDashboard {
    return new WeatherDashboard({
      ...this,
      cities: [...this.cities, city]
    })
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

type FieldNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type Fields<T> = { [K in FieldNames<T>]: T[K] };
