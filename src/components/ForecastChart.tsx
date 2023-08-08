import { useRef, useEffect } from 'react';
import ApexChart from 'apexcharts';
import type { TimeSeries } from '@/weather-dashboard';

type Props = {
  testId?: string;
  data: TimeSeries[];
};

export default function ForecastChart(props: Props) {
  const chartRootDivRef = useRef<HTMLDivElement>(null);
  const apexChartRef = useRef<ApexChart | null>(null);

  // initial render & unmount of the chart
  useEffect(() => {
    const chart = new ApexChart(
      chartRootDivRef.current!,
      defaultChartOptions(),
    );
    chart.render();
    apexChartRef.current = chart;
    return () => apexChartRef.current?.destroy();
  }, []);

  // handle updates to the chart
  useEffect(() => {
    const chart = apexChartRef.current;
    if (chart === null) return;
    chart.updateSeries(props.data);
  }, [props.data]);

  return (
    <div className="w-full" data-testid={props.testId} ref={chartRootDivRef} />
  );
}

function defaultChartOptions() {
  return {
    chart: {
      type: 'line',
    },
    stroke: {
      curve: 'smooth',
    },
    series: [],
    yaxis: {
      type: 'numeric',
      labels: {
        formatter: (value: number) => `${value}℉`,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '01-01',
        '01-02',
        '01-03',
        '01-04',
        '01-05',
        '01-06',
        '01-07',
      ],
    },
  };
}
