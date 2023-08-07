export default class WeatherDashboard {
  readonly cities: Array<City> = [];
  readonly view: View = 'chart';
  readonly forecastDays: number = 3;

  constructor(fields?: Partial<Fields<WeatherDashboard>>) {
    if (fields !== undefined) {
      Object.assign(this, fields)
    }
  }

  foo(): WeatherDashboard {
    return new WeatherDashboard();
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

const foo: Fields<WeatherDashboard> = {
  view: 'chart',
  cities: [],
  forecastDays: 3,
};
