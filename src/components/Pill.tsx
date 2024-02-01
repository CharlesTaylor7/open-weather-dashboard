type Props = {
  label: string;
  onClickRemove: () => void;
};

export default function Pill(props: Props) {
  return (
    <div className="badge badge-lg badge-secondary">
      <span>{props.label}</span>
      <button
        className="btn btn-sm btn-secondary hover:btn-error h-full min-h-0"
        onClick={props.onClickRemove}
      >
        ×
      </button>
    </div>
  );
}
