import { useState, useRef, useCallback } from 'react';
import searchIcon from '@/icons/search.svg';
import { useDashboardState } from '@/useDashboardState';
import type { CityForecast, CityLocation } from '@/weather-dashboard';
import { Forecast, forecast } from '@/api/weather';
import { RawGeocodingResponse, geocode } from '@/api/geocoding';

export default function CitySearch() {
  const [dashboard, updateDashboard] = useDashboardState();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityQueryResult, updateCityQueryResult] = useState<CityQueryResult>({
    type: 'no-active-query',
  });

  const getForecast = useCallback(async (location: CityLocation) => {
    updateCityQueryResult({ type: 'loading' });
    const data = await forecast(location);
    const city = {
      label: cityLabel(location),
      data,
    };
    setSearchTerm('');
    updateDashboard((dashboard) => dashboard.appendCity(city));
    updateCityQueryResult({ type: 'no-active-query' });
  }, []);

  const search = useCallback(async (query: string) => {
    if (query.length === 0) return;

    const locations = await geocode({ q: query, limit: 5 });

    if (locations.length === 0) {
      updateCityQueryResult({
        type: 'error',
        message:
          'No matching location; your search term should just be a city name without commas or other punctation',
      });
      return;
    }

    if (locations.length === 1) {
      const first = locations[0];
      getForecast(first);
      return;
    }
    updateCityQueryResult({ type: 'geocoding', locations });
  }, []);
  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <label>City:</label>
        <input
          autoFocus
          className="grow border rounded p-2"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            updateCityQueryResult({ type: 'no-active-query' });
          }}
          onKeyDown={(e) =>
            e.key === 'Enter' ? search(searchTerm) : undefined
          }
        />
        <button
          className="p-2 bg-blue-200 border rounded-lg"
          onClick={() => search(searchTerm)}
          disabled={searchTerm === '' || cityQueryResult.type === 'loading'}
        >
          <img src={searchIcon} height="20" width="20" />
        </button>
      </div>
      <CitySearchResult result={cityQueryResult} onClick={getForecast} />
    </>
  );
}

type Props = {
  result: CityQueryResult;
  onClick: (location: CityLocation) => void;
};

function CitySearchResult(props: Props) {
  const { result: cityQueryResult } = props;
  if (cityQueryResult.type === 'geocoding') {
    return (
      <div className="flex flex-col gap-3">
        Multiple matching cities, select from:
        {cityQueryResult.locations.map((city, i) => (
          <button
            className="bg-blue-200 py-1 px-2 rounded border"
            key={i}
            onClick={() => props.onClick(city)}
          >
            {cityLabel(city)}
          </button>
        ))}
      </div>
    );
  }

  if (cityQueryResult.type === 'loading') {
    return 'loading...';
  }

  if (cityQueryResult.type === 'error') {
    return <span>{cityQueryResult.message}</span>;
  }
  return null;
}

function cityLabel(location: CityLocation) {
  return [location.name, location.state, location.country]
    .filter((term) => term)
    .join(', ');
}

type Coordinates = {
  lat: number;
  lon: number;
};

type CityQueryResult =
  | { type: 'no-active-query' }
  | {
      type: 'error';
      message: string;
    }
  | {
      type: 'loading';
    }
  | {
      type: 'geocoding';
      locations: Array<CityLocation>;
    };
