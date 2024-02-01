import Pill from '@/components/Pill';
import Select from '@/components/Select';
import ForecastChart from '@/components/ForecastChart';
import ForecastTable from '@/components/ForecastTable';
import CitySearch from '@/components/CitySearch';
import { useDashboardState } from '@/useDashboardState';
import type { View } from '@/weather-dashboard';

export default function WeatherDashboard() {
  const [dashboard, updateDashboard] = useDashboardState();
  return (
    <main data-theme="dark" className="flex h-screen w-full justify-center">
      <div className="w-4/5 md:w-2/3 flex flex-col gap-5 m-5 items-start">
        <header className="w-full text-center bold text-2xl">
          Weather Dashboard
        </header>
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
          </div>
        ) : null}
      </div>
    </main>
  );
}
