import { useRef } from 'react';
import searchIcon from '@/icons/search.svg';
import { useDashboardState } from '@/useDashboardState';
import type { CityQueryResult } from '@/weather-dashboard';
import { Forecast, forecast } from '@/api/weather';
import { RawGeocodingResponse, geocode } from '@/api/geocoding';

export default function CitySearch() {
  const [dashboard, updateDashboard] = useDashboardState();
  const textInputRef = useRef<HTMLInputElement>(null);

  /// TODO: allow disambiguating search
  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <label>City:</label>
        <input
          className="grow border rounded p-2"
          type="text"
          ref={textInputRef}
        />
        <button
          className="p-2 bg-blue-200 border rounded-lg"
          onClick={async () => {
            const input = textInputRef.current?.value || '';
            const forecast = await fetchEightDayForecast(input);
            updateDashboard((dashboard) =>
              dashboard.appendCity({ label: input, data: forecast }),
            );
          }}
        >
          <img src={searchIcon} height="20" width="20" />
        </button>
      </div>
      <CitySearchResult />
    </>
  );
}

function CitySearchResult() {
  const [dashboard, updateDashboard] = useDashboardState();

  if (dashboard.cityQueryResult.type === 'success') {
    return 'success';
  }

  if (dashboard.cityQueryResult.type === 'loading') {
    return 'loading';
  }

  if (dashboard.cityQueryResult.type === 'error') {
    return 'error';
  }
  return null;
}


async function fetchEightDayForecast( q: string,): Promise<Forecast> {
  const locations = await geocode({ q});
  const first = locations[0];
  return forecast({ lat: first.lat, lon: first.lon });
}
