import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  console.log("api key", OPEN_WEATHER_API_KEY)
  return (
    <div className="flex flex-col justify-content align-items gap-5">
      <h1>Vite + React + Typescript</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}
