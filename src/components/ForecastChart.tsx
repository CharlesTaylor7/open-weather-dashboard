import { useRef, useEffect } from "react";
import ApexChart from "apexcharts";
import { toKey, useAppState } from "@/store";

export default function ForecastChart() {
  const { locations, forecasts } = useAppState();

  const data = locations
    .map((city) => ({
      label: city.label,
      forecast: forecasts.get(toKey(city.coordinates)),
    }))
    .filter((city) => city.label && city.forecast)
    .map((city) => ({
      name: city.label!,
      data: city.forecast!.map((d) => ({
        x: normalizeDate(d.datetime),
        y: d.temperature,
      })),
    }));
  if (data.length === 0) return null;

  return <NonEmptyForecastChart data={data} />;
}

// truncates the datetimes to just a date, so it's easy to compare cities in different timezones
function normalizeDate(datetime: Date) {
  const month = datetime.getMonth() + 1;
  const day = datetime.getDate();
  return new Date(`${datetime.getFullYear()}-${month}-${day}`);
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
    //  console.log(chart.w.globals.colors);
  }, [data]);
  return (
    <div className="w-full h-50">
      <div
        className="h-50 **:rounded-lg **:shadow-lg"
        data-testid="chart"
        ref={chartRootDivRef}
      />
    </div>
  );
}

function defaultChartOptions(): ApexChart.ApexOptions {
  return {
    title: {
      text: "Week Forecast",
    },
    chart: {
      type: "line",
      zoom: { enabled: false, allowMouseWheelZoom: false },
    },
    theme: {
      mode: "dark",
    },
    stroke: {
      curve: "smooth",
    },
    series: [],
    yaxis: {
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
