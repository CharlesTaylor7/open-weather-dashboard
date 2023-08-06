import { useRef, useCallback, useState } from 'react';
import { Forecast, forecast } from '@/api/weather';
import ApexCharts from 'apexcharts';

const chartOptions = {
  chart: {
    type: 'line',
  },
  series: [
    {
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};

export default function App() {
  const apexChartDiv = useRef<HTMLDivElement>(null);

  const onForecast = useCallback(() => {
    forecast({ lat: 30, lon: 30 }).then(
      (hourly) => new ApexCharts(apexChartDiv.current, chartOptions).render(),
    );
  }, []);

  return (
    <div className="flex flex-col justify-content align-items gap-5">
      <button className="bg-green-200 w-[200px] mt-5" onClick={onForecast}>
        Forecast
      </button>

      <div ref={apexChartDiv} />
    </div>
  );
}
