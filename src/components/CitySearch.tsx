import { useState, useRef, useCallback } from 'react';
import searchIcon from '@/icons/search.svg';
import { useDashboardState } from '@/useDashboardState';
import type { CityForecast, CityLocation } from '@/weather-dashboard';
import { Forecast, forecast } from '@/api/weather';
import { RawGeocodingResponse, geocode } from '@/api/geocoding';

export default function CitySearch() {
  const [dashboard, updateDashboard] = useDashboardState();

  const textInputRef = useRef<HTMLInputElement>(null);
  const search = useCallback(async () => {
    const textInput = textInputRef.current;
    if (!textInput) {
      return;
    }
    updateDashboard((dashboard) => dashboard.beginCityQuery());
    const city = await fetchEightDayForecast(textInput.value);
    updateDashboard((dashboard) => dashboard.appendCity(city));
    textInput.value = '';
  }, []);
  // TODO:
  // - onkeyboard enter for search
  // - disambiguate search terms
  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <label>City:</label>
        <input
          autoFocus
          className="grow border rounded p-2"
          type="text"
          ref={textInputRef}
          onKeyDown={(e) => (e.key === 'Enter' ? search() : undefined)}
        />
        <button className="p-2 bg-blue-200 border rounded-lg" onClick={search}>
          <img src={searchIcon} height="20" width="20" />
        </button>
      </div>
      <CitySearchResult />
    </>
  );
}

function CitySearchResult() {
  const [dashboard, updateDashboard] = useDashboardState();

  // TODO: lat long
  if (dashboard.cityQueryResult.type === 'geocoding') {
    return (
      <div className="flex flex-col gap-3">
        {dashboard.cityQueryResult.cities.map((city) => (
          <div>{cityLabel(city)}</div>
        ))}
      </div>
    );
  }

  if (dashboard.cityQueryResult.type === 'loading') {
    return 'loading';
  }

  if (dashboard.cityQueryResult.type === 'error') {
    return 'error';
  }
  return null;
}
async function fetchEightDayForecast(query: string): Promise<CityForecast> {
  const locations = await geocode({ q: query });
  const first = locations[0];
  const data = await forecast({ lat: first.lat, lon: first.lon });
  return {
    label: cityLabel(first),
    data,
  };
}

function cityLabel(location: CityLocation) {
  return [location.name, location.state, location.country]
    .filter((term) => term)
    .join(', ');
}
