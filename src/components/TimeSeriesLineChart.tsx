import { useRef, useEffect } from 'react';
import ApexChart from 'apexcharts';

type Props = {
  data: TimeSeries[];
};

export type TimeSeries = {
  name: string;
  data: Array<{ x: string; y: number }>;
};

// TODO: pass raw coordinates, not "Forecast" objects
// don't couple domain to this

export default function TimeSeriesLineChart(props: Props) {
  const chartRootDivRef = useRef<HTMLDivElement>(null);
  const apexChartRef = useRef<ApexChart | null>(null);

  // render the chart
  useEffect(() => {
    let chart = apexChartRef.current;
    if (chart === null) {
      chart = new ApexChart(chartRootDivRef.current!, defaultChartOptions());
      chart.render();
      apexChartRef.current = chart;
    }
    chart.updateSeries(props.data);
  }, [props.data]);

  return <div ref={chartRootDivRef} />;
}

function defaultChartOptions() {
  return {
    chart: {
      type: 'line',
    },
    series: [],
    yaxis: {
      type: 'numeric',
      title: { text: 'farenheight' },
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
