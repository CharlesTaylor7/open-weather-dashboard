import { useRef, useCallback, useState, useEffect } from 'react';
import { Forecast, forecast } from '@/api/weather';
import TimeSeriesLineChart from '@/components/TimeSeriesLineChart';

type GeoCoordinates = {
  lat: number;
  lon: number;
};

type TimeSeriesData = Record<string, Array<{ x: number; y: number }>>;

export default function App() {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData>({});

  const onForecast = useCallback((coords: GeoCoordinates, name: string) => {
    forecast(coords).then((hourly) =>
      setTimeSeriesData((d) => ({
        ...d,
        [name]: hourly.map((h) => ({ x: h.dt, y: h.temp })),
      })),
    );
  }, []);

  return (
    <div className="flex flex-col justify-content align-items gap-5">
      <button
        className="bg-green-200 w-[200px] mt-5"
        onClick={() => onForecast({ lat: 30, lon: 30 }, 'A')}
      >
        Forecast A
      </button>

      <button
        className="bg-green-200 w-[200px] mt-5"
        onClick={() => onForecast({ lat: 45, lon: 180 }, 'B')}
      >
        Forecast B
      </button>

      <button
        className="bg-green-200 w-[200px] mt-5"
        onClick={() => onForecast({ lat: 80, lon: -30 }, 'C')}
      >
        Forecast C
      </button>

      <TimeSeriesLineChart
        data={Object.entries(timeSeriesData).map(([name, data]) => ({
          name,
          data,
        }))}
      />
    </div>
  );
}
