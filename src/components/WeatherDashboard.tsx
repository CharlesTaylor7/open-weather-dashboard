import { useState } from 'react';
import searchIcon from '@/icons/search.svg';
import Pill from '@/components/Pill';
import Select from '@/components/Select';
import ForecastChart from '@/components/TimeSeriesLineChart';
import ForecastTable from '@/components/ForecastTable';
import WeatherDashboardState from '@/weather-dashboard';
import type { TimeSeries } from '@/weather-dashboard';

type View = 'chart' | 'table';
type Props = {};

export default function WeatherDashboard(props: Props) {
  const [dashboard, setState] = useState<WeatherDashboardState>(
    new WeatherDashboardState(),
  );

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 m-5 max-w-4/5 justify-center items-start">
        <header className="self-center bold text-2xl">Weather Dashboard</header>
        <div className="flex gap-2 items-center w-full">
          <label>City, State</label>
          <input className="grow border rounded p-2" type="text" />
          <button className="p-2 bg-blue-200 border rounded-lg">
            <img src={searchIcon} height="20" width="20" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {dashboard.cities.map((city, index) => (
            <Pill
              key={index}
              label={city.label}
              onClickRemove={() =>
                setState((dashbord) => dashboard.removeCity(index))
              }
            />
          ))}
        </div>
        {dashboard.view === 'chart' ? (
          <ForecastChart testId="chart" data={dashboard.allCityTimeSeries()} />
        ) : (
          <ForecastTable testId="table" data={dashboard.allCityTimeSeries()} />
        )}
        <div className="flex flex-wrap gap-3">
          <Select
            testId="dropdown-view-type"
            options={[
              { value: 'chart', label: 'Chart View' },
              { value: 'table', label: 'Table View' },
            ]}
            default={dashboard.view}
            onSelect={(v: string) =>
              setState((dashboard) => dashboard.changeView(v as View))
            }
          />
          <Select
            testId="dropdown-day-range"
            options={[
              { value: '3', label: '3 Day View' },
              { value: '7', label: '7 Day View' },
            ]}
            default={String(dashboard.forecastDays)}
            onSelect={(n) =>
              setState((dashboard) => dashboard.changeForecastDays(Number(n)))
            }
          />
        </div>
      </div>
    </div>
  );
}
