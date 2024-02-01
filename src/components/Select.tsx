type Props = {
  testId?: string;
  options: Array<Option>;
  default: string;
  onSelect: (value: string) => void;
};

type Option = {
  value: string;
  label: string;
};

export default function Select(props: Props) {
  return (
    <select
      className="select select-accent"
      data-testid={props.testId}
      defaultValue={props.default}
      onChange={(event) => props.onSelect(event.target.value)}
    >
      {props.options.map((option) => (
        <option className="" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
