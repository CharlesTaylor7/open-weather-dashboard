import Pill from '@/components/Pill';
import ForecastChart from '@/components/ForecastChart';
import CitySearch from '@/components/CitySearch';
import { useDashboardState } from '@/useDashboardState';

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
        <ForecastChart testId="chart" data={dashboard.forecasted()} />
      </div>
    </main>
  );
}
