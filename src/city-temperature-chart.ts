import ApexChart from 'apexcharts';
import { Forecast } from '@/api/weather';

// Domain object that encapsulates a subset of commands to the Apexcharts object
export class CityTemperatureChart {
  apexChart: ApexChart;

  static options = {
    chart: {
      type: 'line',
    },
    series: [],
    xaxis: {
      type: 'numeric',
    },
  };

  constructor(div: HTMLDivElement) {
    this.apexChart = new ApexChart(div, CityTemperatureChart.options);
  }

  render(): Promise<void> {
    return this.apexChart.render();
  }

  appendCityForecast(cityName: string, hourly: Forecast) {
    this.apexChart.appendSeries({
      name: cityName,
      data: hourly.map((h) => [h.dt, h.temp]),
    } as unknown as ApexAxisChartSeries);
  }
}
