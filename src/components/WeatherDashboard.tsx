import { useState } from 'react';
import caretIcon from '@/icons/dropdown-caret.svg';
import searchIcon from '@/icons/search.svg';
import TimeSeriesLineChart from '@/components/TimeSeriesLineChart';
import WeatherDashboardState from '@/weather-dashboard';
import type { TimeSeries } from '@/weather-dashboard';

type View = 'chart' | 'table';
type Props = {};

export default function WeatherDashboard(props: Props) {
  const [dashboard, setState] = useState<WeatherDashboardState>(
    new WeatherDashboardState(),
  );

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 m-5 max-w-4/5 justify-center items-start">
        <header className="self-center bold text-2xl">Weather Dashboard</header>
        <div className="flex gap-2 items-center w-full">
          <label>City, State</label>
          <input className="grow border rounded p-2" type="text" />
          <button className="p-2 bg-blue-200 border rounded-lg">
            <img src={searchIcon} height="20" width="20" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {dashboard.cities.map((city, index) => (
            <Pill
              key={index}
              label={city.label}
              onClickRemove={() =>
                setState((dashbord) => dashboard.removeCity(index))
              }
            />
          ))}
        </div>
        {dashboard.view === 'chart' ? (
          <TimeSeriesLineChart
            data-testid="chart"
            data={dashboard.allCityTimeSeries()}
          />
        ) : (
          <Table data-testid="table" data={dashboard.allCityTimeSeries()} />
        )}
        <div className="flex flex-wrap gap-3">
          <Dropdown
            data-testid="dropdown-view-type"
            options={[
              { value: 'chart', label: 'Chart View' },
              { value: 'table', label: 'Table View' },
            ]}
            default={dashboard.view}
            onSelect={(v: string) =>
              setState((dashboard) => dashboard.changeView(v as View))
            }
          />
          <Dropdown
            data-testid="dropdown-day-range"
            options={[
              { value: '3', label: '3 Day View' },
              { value: '7', label: '7 Day View' },
            ]}
            default={String(dashboard.forecastDays)}
            onSelect={(n) =>
              setState((dashboard) => dashboard.changeForecastDays(Number(n)))
            }
          />
        </div>
      </div>
    </div>
  );
}

type ButtonToggleProps = {
  label: string;
};

function ButtonToggle(props: ButtonToggleProps) {
  return (
    <button className="bg-green-300 p-2 border rounded-lg">
      {props.label}
    </button>
  );
}

type DropdownProps = {
  'data-testid'?: string;
  options: Array<Option>;
  default: string;
  onSelect: (value: string) => void;
};

type Option = {
  value: string;
  label: string;
};

function Dropdown(props: DropdownProps) {
  return (
    <div className="flex items-center mr-2">
      <select
        className="outline-0 appearance-none border rounded-lg bg-green-300 p-2 pr-9 -mr-9"
        data-testid={props['data-testid']}
        defaultValue={props.default}
        onChange={(e) => props.onSelect(e.target.value)}
      >
        {props.options.map((o, i) => (
          <option className="" key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none pl-2">
        <img src={caretIcon} height="20" width="20" />
      </span>
    </div>
  );
}

type PillProps = {
  label: string;
  onClickRemove: () => void;
};
function Pill(props: PillProps) {
  return (
    <div className="flex items-center border rounded-3xl px-2 py-1 gap-2 bg-slate-200">
      <span>{props.label}</span>
      <button
        className="flex items-center justify-center h-5 w-5 border rounded-full hover:bg-red-200"
        onClick={props.onClickRemove}
      >
        ×
      </button>
    </div>
  );
}

type TableProps = {
  'data-testid'?: string;
  data: Array<TimeSeries>;
};

function Table(props: TableProps) {
  return (
    <div
      className="border border-slate-400 rounded-2xl max-w-full overflow-x-scroll"
      data-testid={props['data-testid']}
    >
      <table className="border-separate border-spacing-0">
        <tbody>
          {props.data.map(({ name, data }, j) => (
            <tr key={j}>
              <th
                className={`
                border-slate-400 p-4
                ${j !== 0 ? 'border-t' : ''} 
              `}
              >
                {name}
              </th>
              {data.map((d, i) => (
                <td
                  className={`
                  border-slate-400 p-4
                  border-l
                  ${j !== 0 ? 'border-t' : ''} 
                `}
                  key={i}
                >
                  {d.y}℉
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
