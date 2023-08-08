import { useRef } from 'react';
import searchIcon from '@/icons/search.svg';
import { useDashboardState } from '@/useDashboardState';
import type { CityForecast } from '@/weather-dashboard';
import { Forecast, forecast } from '@/api/weather';
import { RawGeocodingResponse, CityLocation, geocode } from '@/api/geocoding';

export default function CitySearch() {
  const [dashboard, updateDashboard] = useDashboardState();
  const textInputRef = useRef<HTMLInputElement>(null);
  // TODO:
  // - onkeyboard enter for search
  // - disambiguate search terms
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
            const textInput = textInputRef.current;
            if (!textInput) {
              return;
            }
            const city = await fetchEightDayForecast(textInput.value);
            console.log(city);
            updateDashboard((dashboard) => dashboard.appendCity(city));
            textInput.value = '';
          }}
        >
          <img src={searchIcon} height="20" width="20" />
        </button>
      </div>
    </>
  );
}
  /*
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
   */
async function fetchEightDayForecast(query: string): Promise<CityForecast> {
  const locations = await geocode({ q: query });
  const first = locations[0];
  const data = await forecast({ lat: first.lat, lon: first.lon });
  return {
    label: cityLabel(first),
    data
  };
}

function cityLabel(location: CityLocation) {
  return [location.name, location.state, location.country]
    .filter((term) => term)
    .join(', ');
}
