import { useState } from 'react';
import Pill from '@/components/Pill';
import Select from '@/components/Select';
import ForecastChart from '@/components/ForecastChart';
import ForecastTable from '@/components/ForecastTable';
import CitySearch from '@/components/CitySearch';
import type { TimeSeries } from '@/weather-dashboard';
import WeatherDashboardState from '@/weather-dashboard';
import { useDashboardState } from '@/useDashboardState';

type View = 'chart' | 'table';
type Props = {};

export default function WeatherDashboard(props: Props) {
  const [dashboard, updateDashboard] = useDashboardState();
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 m-5 max-w-4/5 justify-center items-start">
        <header className="self-center bold text-2xl">Weather Dashboard</header>
        <CitySearch />
        <div className="flex flex-wrap gap-2">
          {dashboard.cities.map((city, index) => (
            <Pill
              key={index}
              label={city.label}
              onClickRemove={() =>
                updateDashboard((dashbord) => dashboard.removeCity(index))
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
              updateDashboard((dashboard) => dashboard.changeView(v as View))
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
              updateDashboard((dashboard) =>
                dashboard.changeForecastDays(Number(n)),
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
