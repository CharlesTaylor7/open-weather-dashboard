import { useId } from 'react';
import caretIcon from '@/icons/dropdown-caret.svg';
import searchIcon from '@/icons/search.svg';
import TimeSeriesLineChart, {
  TimeSeries,
} from '@/components/TimeSeriesLineChart';

type View = 'chart' | 'table';
type Props = {
  view: View;
};

Mockup.defaultProps = {
  view: 'table',
};

const cities = ['Chattanooga', 'Knoxville', 'Cleveland', 'Atlanta'];

export default function Mockup(props: Props) {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 m-5 justify-center items-start">
        <header className="self-center bold text-2xl">Weather Dashboard</header>
        <div className="flex gap-2 items-center w-full">
          <label className="block grow-0">City, State</label>
          <input className="block grow border rounded p-2" type="text" />
          <button className="p-2 bg-blue-200 border rounded-lg">
            <img src={searchIcon} height="20" width="20" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Pill key={city} label={city} />
          ))}
        </div>
        {props.view === 'chart' ? (
          <TimeSeriesLineChart data={cities.map(randomTimeSeries)} />
        ) : (
          <Table data={cities.map(randomTimeSeries)} />
        )}
        <div className="flex flex-wrap gap-3">
          <Dropdown
            options={['Chart View', 'Table View']}
            default="Chart View"
          />
          <Dropdown
            options={['3 Day View', '7 Day View']}
            default="7 Day View"
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
  options: Array<string>;
  default: string;
};

function Dropdown(props: DropdownProps) {
  return (
    <div className="flex items-center mr-2">
      <select
        className="outline-0 appearance-none border rounded-lg bg-green-300 p-2 pr-9 -mr-9"
        defaultValue={props.default}
      >
        {props.options.map((o, i) => (
          <option className="" key={i} value={o}>
            {o}
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
};
function Pill(props: PillProps) {
  return (
    <div className="flex items-center border rounded-3xl px-2 py-1 gap-2 bg-slate-200">
      <span>{props.label}</span>
      <button className="flex items-center justify-center h-5 w-5 border rounded-full hover:bg-red-200">
        ×
      </button>
    </div>
  );
}

type TableProps = {
  data: Array<TimeSeries>;
};

function Table(props: TableProps) {
  return (
    <div className="border border-slate-400 rounded-2xl w-full overflow-x-scroll">
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

function randomTimeSeries(name: string): TimeSeries {
  return {
    name,
    data: Array.from({ length: 7 }, (_, k) => ({
      x: `01-${k + 1}`,
      y: Math.floor(Math.random() * 100),
    })),
  };
}
