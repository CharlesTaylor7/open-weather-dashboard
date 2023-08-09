import Table from '@/components/Table';
import type { TimeSeries } from '@/weather-dashboard';
import { formatUTCDate, formatLocalDate } from '@/weather-dashboard';

type Props = {
  testId: string;
  data: Array<TimeSeries>;
};

export default function ForecastTable(props: Props) {
  return (
    <Table
      testId={props.testId}
      rowCount={props.data.length}
      columnCount={props.data[0]?.data?.length || 0}
      formatRowHeader={(rowIndex) => props.data[rowIndex].name}
      formatColumnHeader={(columnIndex) => {
        const date = props.data[0].data[columnIndex].x;
        return formatUTCDate(date) + ' === ' + formatLocalDate(date);
      }}
      formatCell={({ rowIndex, columnIndex }) =>
        `${props.data[rowIndex].data[columnIndex].y.toFixed(0)}℉`
      }
    />
  );
}
