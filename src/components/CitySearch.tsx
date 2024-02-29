import { useCallback } from 'react';
import SearchIcon from '@/icons/search';
import { useDashboardState } from '@/useDashboardState';
import type { CityLocation } from '@/weather-dashboard';
import { forecast } from '@/api/weather';
import { geocode } from '@/api/geocoding';
import debounce from 'lodash/debounce';

export default function CitySearch() {
  const [dashboard, updateDashboard] = useDashboardState();

  const getForecast = useCallback(
    async (location: CityLocation) => {
      updateDashboard((dashboard) => dashboard.showSearchLoading());
      const data = await forecast(location);
      const city = {
        label: cityLabel(location),
        data,
      };
      updateDashboard((dashboard) => dashboard.completeCitySearch(city));
    },
    [updateDashboard],
  );

  // eslint-disable-next-line
  const search = useCallback(
    debounce(async (dashboard) => {
      if (dashboard.searchIsDisabled()) return;
      updateDashboard((dashboard) => dashboard.showSearchLoading());
      const locations = await geocode({
        q: dashboard.citySearchTerm,
        limit: 5,
      });

      if (locations.length === 0) {
        updateDashboard((dashboard) =>
          dashboard.showSearchError(
            'No matching location; double check your spelling?',
          ),
        );

        return;
      }

      updateDashboard((dashboard) => dashboard.showSearchOptions(locations));
    }, 400),
    [updateDashboard, getForecast],
  );
  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <SearchIcon />
        <input
          placeholder="Search for a city here..."
          className="input input-accent w-full"
          type="text"
          autoFocus
          value={dashboard.citySearchTerm}
          onChange={(event) => {
            updateDashboard((dashboard) => {
              const d = dashboard.setSearchTerm(event.target.value);
              search(d);
              return d;
            });
          }}
          onKeyDown={(e) => (e.key === 'Enter' ? search(dashboard) : undefined)}
        />
      </div>
      <CitySearchResult onClick={getForecast} />
    </>
  );
}

type Props = {
  onClick: (location: CityLocation) => void;
};

function CitySearchResult(props: Props) {
  const [{ cityQueryResult }] = useDashboardState();
  if (cityQueryResult.type === 'geocoding') {
    return (
      <div className="flex flex-col gap-3">
        Multiple matching cities, select from:
        {cityQueryResult.locations.map((city, i) => (
          <button
            className="btn btn-primary"
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
    return <span className="loading loading-dots loading-lg" />;
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
