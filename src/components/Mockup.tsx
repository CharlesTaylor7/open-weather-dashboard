import TimeSeriesLineChart from '@/components/TimeSeriesLineChart';

export default function Mockup() {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 m-5 max-w-lg justify-center items-start">
        <header className="self-center bold text-2xl">
          Open Weather Dashboard
        </header>
        <div className="flex gap-2 items-center w-full">
          <label className="block grow-0">City, State</label>
          <input className="block grow border rounded" />
          <button className="block grow-0 flex items-center justify-center px-2 border rounded-2xl">
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill label="Chattanooga" />
          <Pill label="Knoxville" />
          <Pill label="Cleveland" />
          <Pill label="Atlanta" />
        </div>
        <TimeSeriesLineChart data={[]} />
        <div className="flex gap-3">
          <ButtonToggle label="Table View" />
          <ButtonToggle label="3 Day View" />
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
