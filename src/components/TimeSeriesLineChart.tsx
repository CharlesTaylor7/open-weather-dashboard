import { useRef, useEffect } from 'react';
import ApexChart from 'apexcharts';

type Props = {
  data: TimeSeriesData[];
};

type TimeSeriesData = {
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
    xaxis: {
      type: 'datetime',
    },
  };
}
