import searchIcon from '@/icons/search.svg';

export default function CitySearch() {
  return (
    <div className="flex gap-2 items-center w-full">
      <label>City, State</label>
      <input className="grow border rounded p-2" type="text" />
      <button className="p-2 bg-blue-200 border rounded-lg">
        <img src={searchIcon} height="20" width="20" />
      </button>
    </div>
  );
}
