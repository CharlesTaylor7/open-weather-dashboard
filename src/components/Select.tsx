import caretIcon from '@/icons/dropdown-caret.svg';

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
  // there are some negative margin shenanigans to replace the browser defualt caret icon.
  // "appearance-none" removes the default caret from the <select>
  // the right padding + negative margin, "pr-9 -mr-9",
  // shifts the custom caret to be within the border of the <select> element.
  //
  // There's some cleanup margin on the outer div: "mr-2". This ensures a list of multiple Select components don't overlap each other.
  return (
    <div className="flex items-center mr-2">
      <select
        className="outline-0 appearance-none border rounded-lg bg-green-300 p-2 pr-9 -mr-9"
        data-testid={props.testId}
        defaultValue={props.default}
        onChange={(e) => props.onSelect(e.target.value)}
      >
        {props.options.map((o, i) => (
          <option className="" key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none pl-2">
        <img src={caretIcon} height="20" width="20" />
      </span>
    </div>
  );
}
