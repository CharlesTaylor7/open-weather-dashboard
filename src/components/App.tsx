import { forecast } from '@/api/weather';

export default function App() {
  return (
    <div className="flex flex-col justify-content align-items gap-5">
      <button
        className="bg-green-200"
        onClick={() => forecast({ lat: 30, lon: 30 })}
      >
        Forecast
      </button>
    </div>
  );
}
