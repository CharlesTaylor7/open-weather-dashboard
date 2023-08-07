import TimeSeriesLineChart from '@/components/TimeSeriesLineChart';

export default function Mockup() {
  return (
    <div className="flex flex-col gap-5 mt-5 w-full justify-center items-center">
      <header>Open Weather Dashboard</header>
      <div>
        <label>City, State</label>
        <input />
      </div>
      <div>
        <div className="inline-block">
          <span>Chattanooga</span>
          <button>x</button>
        </div>
        <div className="inline-block">
          <span>Knoxville</span>
          <button>x</button>
        </div>
      </div>
      <TimeSeriesLineChart data={[]} />
      <div>
        <button>Table View</button>
        <button>3 Day View</button>
      </div>
    </div>
  );
}
