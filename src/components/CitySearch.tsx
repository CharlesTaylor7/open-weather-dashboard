import { useCallback } from 'react';
import searchIcon from '@/icons/search.svg';
import { useDashboardState } from '@/useDashboardState';
import type { CityLocation } from '@/weather-dashboard';
import { forecast } from '@/api/weather';
import { geocode } from '@/api/geocoding';

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

  const search = useCallback(async () => {
    if (dashboard.searchIsDisabled()) return;
    updateDashboard((dashboard) => dashboard.showSearchLoading());
    const locations = await geocode({ q: dashboard.citySearchTerm, limit: 5 });

    if (locations.length === 0) {
      updateDashboard((dashboard) =>
        dashboard.showSearchError(
          'No matching location; double check your spelling?',
        ),
      );

      return;
    }

    if (locations.length === 1) {
      getForecast(locations[0]);
      return;
    }
    updateDashboard((dashboard) => dashboard.showSearchOptions(locations));
  }, [dashboard, updateDashboard, getForecast]);
  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <input
          placeholder="Search for a city here..."
          className="input input-bordered w-full"
          type="text"
          autoFocus
          value={dashboard.citySearchTerm}
          onChange={(event) =>
            updateDashboard((dashboard) =>
              dashboard.setSearchTerm(event.target.value),
            )
          }
          onKeyDown={(e) => (e.key === 'Enter' ? search() : undefined)}
        />
        <button
          className="btn btn-primary"
          onClick={search}
          disabled={dashboard.searchIsDisabled()}
        >
          <img src={searchIcon} height="20" width="20" />
        </button>
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
