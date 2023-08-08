type Props = {
  label: string;
  onClickRemove: () => void;
};

export default function Pill(props: Props) {
  return (
    <div className="flex items-center border rounded-3xl px-2 py-1 gap-2 bg-slate-200">
      <span>{props.label}</span>
      <button
        className="flex items-center justify-center h-5 w-5 border rounded-full hover:bg-red-200"
        onClick={props.onClickRemove}
      >
        ×
      </button>
    </div>
  );
}
