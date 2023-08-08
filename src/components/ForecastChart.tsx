import { useRef, useEffect } from 'react';
import ApexChart from 'apexcharts';
import WeatherDashboard, { formatDate } from '@/weather-dashboard';
import type { TimeSeries } from '@/weather-dashboard';

type Props = {
  testId?: string;
  data: TimeSeries[];
};

export default function ForecastChart(props: Props) {
  if (props.data.length === 0) return null;
  return <NonEmptyForecastChart {...props} />;
}

function NonEmptyForecastChart(props: Props) {
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
        formatter: (value: number) => `${value.toFixed(0)}℉`,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MMM dd',
      },
    },
  };
}
