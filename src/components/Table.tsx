type Props = {
  testId?: string;
  rowCount: number;
  columnCount: number;
  formatRowHeader: (rowIndex: number) => string;
  formatColumnHeader: (columnIndex: number) => string;
  formatCell: (coordinates: Coordinates) => string;
};

type Coordinates = {
  rowIndex: number;
  columnIndex: number;
};

export default function Table(props: Props) {
  return (
    <div
      className="border border-slate-400 rounded-2xl max-w-full overflow-x-scroll"
      data-testid={props.testId}
    >
      <table className="border-separate border-spacing-0">
        <thead>
          <tr>
            <th scope="col" />
            {Array.from({ length: props.columnCount }, (_, columnIndex) => (
              <th
                key={columnIndex}
                scope="col"
                className="border-slate-400 p-4 border-l"
              >
                {props.formatColumnHeader(columnIndex)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: props.rowCount }, (_, rowIndex) => (
            <tr>
              <th scope="row" className="border-slate-400 p-4 border-t">
                {props.formatRowHeader(rowIndex)}
              </th>
              {Array.from({ length: props.columnCount }, (_, columnIndex) => (
                <td
                  className="border-slate-400 p-4 border-l border-t"
                  key={columnIndex}
                >
                  {props.formatCell({ rowIndex, columnIndex })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
