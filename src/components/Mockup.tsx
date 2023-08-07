import { useId } from 'react';
import caretIcon from '../../public/icons/dropdown-caret.svg';
import searchIcon from '../../public/icons/search.svg';
import TimeSeriesLineChart from '@/components/TimeSeriesLineChart';

type Props = {
};

Mockup.defaultProps = {
};

export default function Mockup(props: Props) {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 m-5 max-w-lg justify-center items-start">
        <header className="self-center bold text-2xl">Weather Dashboard</header>
        <div className="flex gap-2 items-center w-full">
          <label className="block grow-0">City, State</label>
          <input 
            className="block grow border rounded p-2" 
            
            type="text"
          />
          <button className="p-2 bg-blue-200 border rounded-lg">
            <img src={searchIcon} height="20" width="20" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill label="Chattanooga" />
          <Pill label="Knoxville" />
          <Pill label="Cleveland" />
          <Pill label="Atlanta" />
        </div>
        <TimeSeriesLineChart data={[]} />
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
      <select className="outline-0 appearance-none border rounded-lg bg-green-300 p-2 pr-7 -mr-7">
        {props.options.map((o, i) => (
          <option className="" key={i} value={o} selected={o === props.default}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none">
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
