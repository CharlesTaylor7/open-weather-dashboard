import { useRef, useEffect } from "react";
import ApexChart from "apexcharts";
import { useAppState, type CityForecast } from "@/store";

export default function ForecastChart() {
  const { forecasts } = useAppState();
  if (forecasts.length === 0) return null;
  const timeSeries = toTimeSeries(forecasts);

  return <NonEmptyForecastChart data={timeSeries} />;
}

type Props = {
  data: TimeSeries[];
};

type TimeSeries = {
  name: string;
  data: Array<{ x: Date; y: number }>;
};
function NonEmptyForecastChart({ data }: Props) {
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
    chart.updateSeries(data);
  }, [data]);
  return <div className="w-full" data-testid="chart" ref={chartRootDivRef} />;
}

function defaultChartOptions() {
  return {
    chart: {
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    series: [],
    yaxis: {
      type: "numeric",
      labels: {
        formatter: (value: number) => `${value.toFixed(0)}℉`,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "MMM dd",
      },
    },
  };
}

function toTimeSeries(cities: CityForecast[]): TimeSeries[] {
  return cities.map((city) => ({
    name: city.label,
    data: city.forecast.map((d) => ({
      x: normalizeDate(d.datetime),
      y: d.temperature,
    })),
  }));
}

// truncates the datetimes to just a date, so it's easy to compare cities in different timezones
function normalizeDate(datetime: Date) {
  const month = datetime.getMonth() + 1;
  const day = datetime.getDate();
  return new Date(`${datetime.getFullYear()}-${month}-${day}`);
}
