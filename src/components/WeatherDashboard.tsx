import Pill from '@/components/Pill';
import Select from '@/components/Select';
import ForecastChart from '@/components/ForecastChart';
import ForecastTable from '@/components/ForecastTable';
import CitySearch from '@/components/CitySearch';
import { useDashboardState } from '@/useDashboardState';

export default function WeatherDashboard() {
  const [dashboard, updateDashboard] = useDashboardState();
  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-4/5 md:w-2/3 xl:w-1/2 flex flex-col gap-5 m-5 justify-center items-start">
        <header className="self-center bold text-2xl">Weather Dashboard</header>
        <CitySearch />
        <div className="flex flex-wrap gap-2">
          {dashboard.cities.map((city, index) => (
            <Pill
              key={index}
              label={city.label}
              onClickRemove={() =>
                updateDashboard((dashboard) => dashboard.removeCity(index))
              }
            />
          ))}
        </div>
        {dashboard.view === 'chart' ? (
          <ForecastChart testId="chart" data={dashboard.forecasted()} />
        ) : (
          <ForecastTable testId="table" data={dashboard.forecasted()} />
        )}
        {dashboard.cities.length > 0 ? (
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
        ) : null}
      </div>
    </div>
  );
}

type View = 'chart' | 'table';
