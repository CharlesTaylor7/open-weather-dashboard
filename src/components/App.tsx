import { useRef, useCallback, useState, useEffect } from 'react';
import { Forecast, forecast } from '@/api/weather';
import { CityTemperatureChart } from '@/city-temperature-chart';

type GeoCoordinates = {
  lat: number;
  lon: number;
};

export default function App() {
  const apexChartDiv = useRef<HTMLDivElement>(null);
  const apexChartInstance = useRef<CityTemperatureChart | null>(null);

  useEffect(() => {
    if (apexChartInstance.current === null) {
      const chart = new CityTemperatureChart(apexChartDiv.current!);
      chart.render();
      apexChartInstance.current = chart;
    }
  }, []);

  const onForecast = useCallback((coords: GeoCoordinates, name: string) => {
    forecast(coords).then(
      (hourly) => apexChartInstance.current?.appendCityForecast(name, hourly),
    );
  }, []);

  const onClear = useCallback(() => {
    apexChartInstance.current?.clear();
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

      <button className="bg-green-200 w-[200px] mt-5" onClick={onClear}>
        Clear
      </button>
      <div ref={apexChartDiv} />
    </div>
  );
}
